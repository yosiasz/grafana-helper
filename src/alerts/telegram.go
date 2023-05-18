{{ define "tele" }}
  {{ if gt (len .Alerts.Firing) 0 }}
  FIRING: {{ len .Alerts.Firing }} alerts
  {{ range .Alerts.Firing }}
  {{ if gt (len .Annotations) 0 }}
  Summary: {{ .Annotations.summary }}
  Description: {{ .Annotations.description }}
  Labels: {{ range .Labels.SortedPairs }} {{ .Name }}: {{ .Value }}
  {{ end }}
  {{ end }}
  {{ end }}
  {{ end }}
  {{ if gt (len .Alerts.Resolved) 0 }}
  RESOLVED: {{ len .Alerts.Resolved }} alerts
  {{ range .Alerts.Resolved }}
  {{ if gt (len .Annotations) 0 }}
  Summary: {{ .Annotations.summary }}
  Description: {{ .Annotations.description }}
  Labels: {{ range .Labels.SortedPairs }} {{ .Name }}: {{ .Value }}
  {{ end }}
  {{ end }}
  {{ end }}
  {{ end }}
{{ end }}