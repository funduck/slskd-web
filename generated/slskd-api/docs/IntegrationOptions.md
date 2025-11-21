
# IntegrationOptions

Options for external integrations.

## Properties

Name | Type
------------ | -------------
`webhooks` | [{ [key: string]: WebhookOptions; }](WebhookOptions.md)
`scripts` | [{ [key: string]: ScriptOptions; }](ScriptOptions.md)
`ftp` | [FtpOptions](FtpOptions.md)
`pushbullet` | [PushbulletOptions](PushbulletOptions.md)

## Example

```typescript
import type { IntegrationOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "webhooks": null,
  "scripts": null,
  "ftp": null,
  "pushbullet": null,
} satisfies IntegrationOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as IntegrationOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


