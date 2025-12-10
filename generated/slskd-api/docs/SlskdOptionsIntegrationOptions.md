
# SlskdOptionsIntegrationOptions

Options for external integrations.

## Properties

Name | Type
------------ | -------------
`webhooks` | [{ [key: string]: SlskdOptionsIntegrationOptionsWebhookOptions; }](SlskdOptionsIntegrationOptionsWebhookOptions.md)
`scripts` | [{ [key: string]: SlskdOptionsIntegrationOptionsScriptOptions; }](SlskdOptionsIntegrationOptionsScriptOptions.md)
`ftp` | [SlskdOptionsIntegrationOptionsFtpOptions](SlskdOptionsIntegrationOptionsFtpOptions.md)
`pushbullet` | [SlskdOptionsIntegrationOptionsPushbulletOptions](SlskdOptionsIntegrationOptionsPushbulletOptions.md)

## Example

```typescript
import type { SlskdOptionsIntegrationOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "webhooks": null,
  "scripts": null,
  "ftp": null,
  "pushbullet": null,
} satisfies SlskdOptionsIntegrationOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdOptionsIntegrationOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


