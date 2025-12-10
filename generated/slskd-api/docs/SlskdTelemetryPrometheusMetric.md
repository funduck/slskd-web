
# SlskdTelemetryPrometheusMetric


## Properties

Name | Type
------------ | -------------
`name` | string
`help` | string
`type` | string
`sum` | number
`count` | number
`samples` | [Array&lt;SlskdTelemetryPrometheusMetricSample&gt;](SlskdTelemetryPrometheusMetricSample.md)
`buckets` | [{ [key: string]: SlskdTelemetryPrometheusMetricSample; }](SlskdTelemetryPrometheusMetricSample.md)
`quantiles` | { [key: string]: number | null; }

## Example

```typescript
import type { SlskdTelemetryPrometheusMetric } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "help": null,
  "type": null,
  "sum": null,
  "count": null,
  "samples": null,
  "buckets": null,
  "quantiles": null,
} satisfies SlskdTelemetryPrometheusMetric

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdTelemetryPrometheusMetric
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


