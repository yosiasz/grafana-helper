{{ define "slack.default.title" }}
[ {{ .Status | toUpper }}  ]
{{ end }}

{{ define "slack.default.message" }}
{{ range . }}
{{ if gt (len .Annotations.summary) 0 }}Alert Summary: {{ .Annotations.summary }} {{ end }}
{{ if gt (len .Annotations.runbook_url) 0 }}Alert Runbook: {{ .Annotations.runbook_url }} {{ end }}

Labels:
{{ range .Labels.SortedPairs }}
- {{ .Name }} = {{ .Value }}
{{ end }}

{{ if gt (len .GeneratorURL) 0 }}Source: {{ .GeneratorURL }}
{{ end }}{{ if gt (len .SilenceURL) 0 }}Silence: {{ .SilenceURL }}
{{ end }}{{ if gt (len .DashboardURL) 0 }}Dashboard: {{ .DashboardURL }}
{{ end }}

{{ end }}
{{ end }}

{{ define "slack.resolved.message" }}

{{ range . }}

{{ .Labels.alertname }} on {{ .Labels.hostname }}

{{ if gt (len .GeneratorURL) 0 }}Source: {{ .GeneratorURL }}
{{ end }}{{ if gt (len .SilenceURL) 0 }}Silence: {{ .SilenceURL }}
{{ end }}{{ if gt (len .DashboardURL) 0 }}Dashboard: {{ .DashboardURL }}
{{ end }}

{{ end }}
{{ end }}


{{ define "slack" }}
        {{ if gt (len .Alerts.Firing) 0 }}**Firing**{{ template "slack.default.message" .Alerts.Firing }}{{ end }}
        {{ if gt (len .Alerts.Resolved) 0 }}**Resolved**{{ template "slack.resolved.message" .Alerts.Resolved }}{{ end }}
{{ end }}