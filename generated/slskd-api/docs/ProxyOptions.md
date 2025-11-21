
# ProxyOptions

Connection proxy options.

## Properties

Name | Type
------------ | -------------
`enabled` | boolean
`address` | string
`port` | number
`username` | string
`password` | string

## Example

```typescript
import type { ProxyOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "enabled": null,
  "address": null,
  "port": null,
  "username": null,
  "password": null,
} satisfies ProxyOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProxyOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


