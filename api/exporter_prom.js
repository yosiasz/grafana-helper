const opentelemetry = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const {
    PeriodicExportingMetricReader,
    ConsoleMetricExporter,
  } = require('@opentelemetry/sdk-metrics');
const sdk = new opentelemetry.NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  exporter: new ConsoleMetricExporter(),
  metricReader: new PrometheusExporter({
    port: 9464, // optional - default is 9464
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();