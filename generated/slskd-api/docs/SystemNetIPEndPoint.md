
# SystemNetIPEndPoint


## Properties

Name | Type
------------ | -------------
`address_family` | [SystemNetSocketsAddressFamily](SystemNetSocketsAddressFamily.md)
`address` | [SystemNetIPAddress](SystemNetIPAddress.md)
`port` | number

## Example

```typescript
import type { SystemNetIPEndPoint } from ''

// TODO: Update the object below with actual values
const example = {
  "address_family": null,
  "address": null,
  "port": null,
} satisfies SystemNetIPEndPoint

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SystemNetIPEndPoint
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


