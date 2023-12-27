/*instrumentation.js*/
// Require dependencies
const { NodeSDK } = require('@opentelemetry/sdk-node');
const {
    OTLPTraceExporter,
  } = require('@opentelemetry/exporter-trace-otlp-proto');
  const {
    OTLPMetricExporter,
  } = require('@opentelemetry/exporter-metrics-otlp-proto');  
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');

const sdk = new NodeSDK({
  //traceExporter: new ConsoleSpanExporter(),
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    //url: 'http://127.0.0.1:4318/v1/traces',
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }),  
  
  metricReader: new PeriodicExportingMetricReader({
    //exporter: new ConsoleMetricExporter(),
    exporter: new OTLPMetricExporter({
      // optional - default url is http://localhost:4318/v1/metrics
        //url: 'http://127.0.0.1:4318/v1/metrics', // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
        headers: {}, // an optional object containing custom headers to be sent with each request
        concurrencyLimit: 1, // an optional limit on pending requests
      }),    
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();