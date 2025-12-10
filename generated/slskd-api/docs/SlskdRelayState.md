
# SlskdRelayState


## Properties

Name | Type
------------ | -------------
`mode` | [SlskdRelayRelayMode](SlskdRelayRelayMode.md)
`controller` | [SlskdRelayControllerState](SlskdRelayControllerState.md)
`agents` | [Array&lt;SlskdRelayAgent&gt;](SlskdRelayAgent.md)

## Example

```typescript
import type { SlskdRelayState } from ''

// TODO: Update the object below with actual values
const example = {
  "mode": null,
  "controller": null,
  "agents": null,
} satisfies SlskdRelayState

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdRelayState
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


