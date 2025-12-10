
# SlskdOptions

Application options.

## Properties

Name | Type
------------ | -------------
`debug` | boolean
`headless` | boolean
`remote_configuration` | boolean
`remote_file_management` | boolean
`instance_name` | string
`flags` | [SlskdOptionsFlagsOptions](SlskdOptionsFlagsOptions.md)
`relay` | [SlskdOptionsRelayOptions](SlskdOptionsRelayOptions.md)
`permissions` | [SlskdOptionsPermissionsOptions](SlskdOptionsPermissionsOptions.md)
`directories` | [SlskdOptionsDirectoriesOptions](SlskdOptionsDirectoriesOptions.md)
`shares` | [SlskdOptionsSharesOptions](SlskdOptionsSharesOptions.md)
`global` | [SlskdOptionsGlobalOptions](SlskdOptionsGlobalOptions.md)
`groups` | [SlskdOptionsGroupsOptions](SlskdOptionsGroupsOptions.md)
`blacklist` | [SlskdOptionsBlacklistOptions](SlskdOptionsBlacklistOptions.md)
`filters` | [SlskdOptionsFiltersOptions](SlskdOptionsFiltersOptions.md)
`rooms` | Array&lt;string&gt;
`web` | [SlskdOptionsWebOptions](SlskdOptionsWebOptions.md)
`retention` | [SlskdOptionsRetentionOptions](SlskdOptionsRetentionOptions.md)
`logger` | [SlskdOptionsLoggerOptions](SlskdOptionsLoggerOptions.md)
`metrics` | [SlskdOptionsMetricsOptions](SlskdOptionsMetricsOptions.md)
`feature` | [SlskdOptionsFeatureOptions](SlskdOptionsFeatureOptions.md)
`soulseek` | [SlskdOptionsSoulseekOptions](SlskdOptionsSoulseekOptions.md)
`integration` | [SlskdOptionsIntegrationOptions](SlskdOptionsIntegrationOptions.md)

## Example

```typescript
import type { SlskdOptions } from ''

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
} satisfies SlskdOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


