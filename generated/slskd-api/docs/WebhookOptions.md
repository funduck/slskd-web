
# WebhookOptions

Webhook configuration.

## Properties

Name | Type
------------ | -------------
`on` | Array&lt;string&gt;
`call` | [WebhookHttpOptions](WebhookHttpOptions.md)
`timeout` | number
`retry` | [RetryOptions](RetryOptions.md)

## Example

```typescript
import type { WebhookOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "on": null,
  "call": null,
  "timeout": null,
  "retry": null,
} satisfies WebhookOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WebhookOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


