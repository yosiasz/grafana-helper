import requests
import json
import copy
import time
from typing import Any
from dotenv import load_dotenv
import os

# Load variables from .env file
load_dotenv()

# Access them with os.getenv or os.environ
GRAFANA_API_TOKEN = os.getenv("GRAFANA_API_TOKEN")

# ==========================================
# CONFIG
# ==========================================

GRAFANA_URL = "http://localhost:3000"

OLD_DS_UID = "old-datasource-uid"
NEW_DS_UID = "new-datasource-uid"

VERIFY_SSL = True
DRY_RUN = True          # Set to False to actually update
BACKUP = True           # Save dashboard json before changes
RATE_LIMIT_SLEEP = 0.1  # avoid hammering Grafana

HEADERS = {
    "Authorization": f"Bearer {GRAFANA_API_TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}


# ==========================================
# SESSION
# ==========================================

session = requests.Session()
session.headers.update(HEADERS)
session.verify = VERIFY_SSL


# ==========================================
# HELPERS
# ==========================================

def get_all_dashboards():
    """
    Get all dashboards from Grafana.
    Excludes folders.
    """
    dashboards = []
    page = 1
    limit = 5000

    while True:
        url = (
            f"{GRAFANA_URL}/api/search"
            f"?type=dash-db&limit={limit}&page={page}"
        )

        response = session.get(url)
        response.raise_for_status()

        data = response.json()

        if not data:
            break

        dashboards.extend(data)

        if len(data) < limit:
            break

        page += 1

    return dashboards

def export_dashboard_provision(uid):
    """
    Export dashboard JSON for given UID.
    """
    url = f"{GRAFANA_URL}/api/dashboards/uid/{uid}"

    response = session.get(url)
    response.raise_for_status()

    return response.json()
def update_datasource(dashboard_payload):
        try:
            dashboard_payload = get_dashboard(uid)

            original = copy.deepcopy(dashboard_payload)

            replacements = replace_datasource_uid(
                dashboard_payload["dashboard"]
            )

            if replacements == 0:
                skipped_count += 1
                print("  No datasource references found")
                continue

            total_replacements += replacements

            print(f"  Replaced {replacements} reference(s)")

            if BACKUP:
                save_backup(uid, original)

            if DRY_RUN:
                print("  DRY RUN - not updating")
            else:
                result = update_dashboard(dashboard_payload)
                print(
                    f"  Updated dashboard "
                    f"(version={result.get('version')})"
                )

            updated_count += 1

            time.sleep(RATE_LIMIT_SLEEP)

        except Exception as e:
            print(f"  ERROR: {str(e)}")    
def get_dashboard(uid):
    """
    Fetch full dashboard JSON.
    """
    url = f"{GRAFANA_URL}/api/dashboards/uid/{uid}"

    response = session.get(url)
    response.raise_for_status()

    return response.json()


def save_backup(uid, dashboard):
    """
    Save backup to local file.
    """
    filename = f"backup_{uid}.json"

    with open(filename, "w", encoding="utf-8") as f:
        json.dump(dashboard, f, indent=2)

    print(f"  Backup saved: {filename}")


def replace_datasource_uid(obj: Any) -> int:
    """
    Recursively walk dashboard JSON and replace datasource UID.

    Returns:
        number of replacements
    """
    replacements = 0

    if isinstance(obj, dict):

        # Case:
        # "datasource": {"type": "...", "uid": "..."}
        datasource = obj.get("datasource")

        if isinstance(datasource, dict):
            uid = datasource.get("uid")

            if uid == OLD_DS_UID:
                datasource["uid"] = NEW_DS_UID
                replacements += 1

        # Case:
        # datasourceUid property
        if obj.get("datasourceUid") == OLD_DS_UID:
            obj["datasourceUid"] = NEW_DS_UID
            replacements += 1

        # Continue recursion
        for value in obj.values():
            replacements += replace_datasource_uid(value)

    elif isinstance(obj, list):
        for item in obj:
            replacements += replace_datasource_uid(item)

    return replacements


def update_dashboard(dashboard_payload):
    """
    Push dashboard update back to Grafana.
    """
    dashboard = dashboard_payload["dashboard"]

    payload = {
        "dashboard": dashboard,
        "folderId": dashboard_payload["meta"]["folderId"],
        "overwrite": True,
        "message": f"Datasource UID migration "
                   f"{OLD_DS_UID} -> {NEW_DS_UID}",
    }

    url = f"{GRAFANA_URL}/api/dashboards/db"

    response = session.post(url, json=payload)
    response.raise_for_status()

    return response.json()


# ==========================================
# MAIN
# ==========================================

def main():
    dashboards = get_all_dashboards()

    print(f"Found {len(dashboards)} dashboards")
    print()

    updated_count = 0
    skipped_count = 0
    total_replacements = 0

    for d in dashboards:
        uid = d["uid"]
        title = d.get("title", uid)

        print(f"Processing: {title} ({uid})")


    print("\n========== SUMMARY ==========")
    print(f"Updated dashboards: {updated_count}")
    print(f"Skipped dashboards: {skipped_count}")
    print(f"Total replacements: {total_replacements}")


if __name__ == "__main__":
    main()