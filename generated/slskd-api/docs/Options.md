
# Options

Application options.

## Properties

Name | Type
------------ | -------------
`debug` | boolean
`headless` | boolean
`remote_configuration` | boolean
`remote_file_management` | boolean
`instance_name` | string
`flags` | [FlagsOptions](FlagsOptions.md)
`relay` | [RelayOptions](RelayOptions.md)
`permissions` | [PermissionsOptions](PermissionsOptions.md)
`directories` | [DirectoriesOptions](DirectoriesOptions.md)
`shares` | [SharesOptions](SharesOptions.md)
`global` | [GlobalOptions](GlobalOptions.md)
`groups` | [GroupsOptions](GroupsOptions.md)
`blacklist` | [BlacklistOptions](BlacklistOptions.md)
`filters` | [FiltersOptions](FiltersOptions.md)
`rooms` | Array&lt;string&gt;
`web` | [WebOptions](WebOptions.md)
`retention` | [RetentionOptions](RetentionOptions.md)
`logger` | [LoggerOptions](LoggerOptions.md)
`metrics` | [MetricsOptions](MetricsOptions.md)
`feature` | [FeatureOptions](FeatureOptions.md)
`soulseek` | [SoulseekOptions](SoulseekOptions.md)
`integration` | [IntegrationOptions](IntegrationOptions.md)

## Example

```typescript
import type { Options } from ''

// TODO: Update the object below with actual values
const example = {
  "debug": null,
  "headless": null,
  "remote_configuration": null,
  "remote_file_management": null,
  "instance_name": null,
  "flags": null,
  "relay": null,
  "permissions": null,
  "directories": null,
  "shares": null,
  "global": null,
  "groups": null,
  "blacklist": null,
  "filters": null,
  "rooms": null,
  "web": null,
  "retention": null,
  "logger": null,
  "metrics": null,
  "feature": null,
  "soulseek": null,
  "integration": null,
} satisfies Options

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Options
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


