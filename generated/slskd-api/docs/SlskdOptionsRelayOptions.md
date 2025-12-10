
# SlskdOptionsRelayOptions

Relay options.

## Properties

Name | Type
------------ | -------------
`enabled` | boolean
`mode` | string
`controller` | [SlskdOptionsRelayOptionsRelayControllerConfigurationOptions](SlskdOptionsRelayOptionsRelayControllerConfigurationOptions.md)
`agents` | [{ [key: string]: SlskdOptionsRelayOptionsRelayAgentConfigurationOptions; }](SlskdOptionsRelayOptionsRelayAgentConfigurationOptions.md)

## Example

```typescript
import type { SlskdOptionsRelayOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "enabled": null,
  "mode": null,
  "controller": null,
  "agents": null,
} satisfies SlskdOptionsRelayOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdOptionsRelayOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


