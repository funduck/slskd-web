
# WebhookHttpOptions

Webhook HTTP options.

## Properties

Name | Type
------------ | -------------
`url` | string
`headers` | [Array&lt;WebhookHttpHeader&gt;](WebhookHttpHeader.md)
`ignore_certificate_errors` | boolean

## Example

```typescript
import type { WebhookHttpOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "url": null,
  "headers": null,
  "ignore_certificate_errors": null,
} satisfies WebhookHttpOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WebhookHttpOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


