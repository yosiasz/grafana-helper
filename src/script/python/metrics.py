import time

from opentelemetry import metrics
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import ConsoleMetricsExporter
from opentelemetry.sdk.metrics.export.controller import PushController

metrics.set_meter_provider(MeterProvider())
meter = metrics.get_meter(__name__, True)
exporter = ConsoleMetricsExporter()
controller = PushController(meter, exporter, 5)

staging_labels = {"environment": "staging"}

requests_counter = meter.create_counter(
    name="requests",
    description="number of requests",
    unit="1",
    value_type=int,
    label_keys=("environment",),
)

requests_counter.add(25, staging_labels)
time.sleep(5)

requests_counter.add(20, staging_labels)
time.sleep(5)