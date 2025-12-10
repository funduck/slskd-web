
# SystemNetIPAddress


## Properties

Name | Type
------------ | -------------
`address_family` | [SystemNetSocketsAddressFamily](SystemNetSocketsAddressFamily.md)
`scope_id` | number
`is_ipv6_multicast` | boolean
`is_ipv6_link_local` | boolean
`is_ipv6_site_local` | boolean
`is_ipv6_teredo` | boolean
`is_ipv6_unique_local` | boolean
`is_ipv4_mapped_to_ipv6` | boolean
`address` | number

## Example

```typescript
import type { SystemNetIPAddress } from ''

// TODO: Update the object below with actual values
const example = {
  "address_family": null,
  "scope_id": null,
  "is_ipv6_multicast": null,
  "is_ipv6_link_local": null,
  "is_ipv6_site_local": null,
  "is_ipv6_teredo": null,
  "is_ipv6_unique_local": null,
  "is_ipv4_mapped_to_ipv6": null,
  "address": null,
} satisfies SystemNetIPAddress

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SystemNetIPAddress
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


