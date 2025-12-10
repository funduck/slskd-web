
# SlskdOptionsIntegrationOptionsFtpOptions

FTP options.

## Properties

Name | Type
------------ | -------------
`enabled` | boolean
`address` | string
`port` | number
`encryption_mode` | string
`ignore_certificate_errors` | boolean
`username` | string
`password` | string
`remote_path` | string
`overwrite_existing` | boolean
`connection_timeout` | number
`retry_attempts` | number

## Example

```typescript
import type { SlskdOptionsIntegrationOptionsFtpOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "enabled": null,
  "address": null,
  "port": null,
  "encryption_mode": null,
  "ignore_certificate_errors": null,
  "username": null,
  "password": null,
  "remote_path": null,
  "overwrite_existing": null,
  "connection_timeout": null,
  "retry_attempts": null,
} satisfies SlskdOptionsIntegrationOptionsFtpOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdOptionsIntegrationOptionsFtpOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


