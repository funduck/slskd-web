
# FlagsOptions

Optional flags.

## Properties

Name | Type
------------ | -------------
`no_logo` | boolean
`no_start` | boolean
`no_config_watch` | boolean
`no_connect` | boolean
`no_share_scan` | boolean
`force_share_scan` | boolean
`force_migrations` | boolean
`no_version_check` | boolean
`log_sql` | boolean
`experimental` | boolean
`_volatile` | boolean
`case_sensitive_reg_ex` | boolean
`legacy_windows_tcp_keepalive` | boolean
`optimistic_relay_file_info` | boolean

## Example

```typescript
import type { FlagsOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "no_logo": null,
  "no_start": null,
  "no_config_watch": null,
  "no_connect": null,
  "no_share_scan": null,
  "force_share_scan": null,
  "force_migrations": null,
  "no_version_check": null,
  "log_sql": null,
  "experimental": null,
  "_volatile": null,
  "case_sensitive_reg_ex": null,
  "legacy_windows_tcp_keepalive": null,
  "optimistic_relay_file_info": null,
} satisfies FlagsOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FlagsOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


