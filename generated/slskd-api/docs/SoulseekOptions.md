
# SoulseekOptions

Soulseek client options.

## Properties

Name | Type
------------ | -------------
`address` | string
`port` | number
`username` | string
`password` | string
`description` | string
`picture` | string
`listen_ip_address` | string
`listen_port` | number
`diagnostic_level` | string
`distributed_network` | [DistributedNetworkOptions](DistributedNetworkOptions.md)
`connection` | [ConnectionOptions](ConnectionOptions.md)

## Example

```typescript
import type { SoulseekOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "address": null,
  "port": null,
  "username": null,
  "password": null,
  "description": null,
  "picture": null,
  "listen_ip_address": null,
  "listen_port": null,
  "diagnostic_level": null,
  "distributed_network": null,
  "connection": null,
} satisfies SoulseekOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SoulseekOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


