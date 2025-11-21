
# WebAuthenticationOptions

Authentication options.

## Properties

Name | Type
------------ | -------------
`disabled` | boolean
`username` | string
`password` | string
`jwt` | [JwtOptions](JwtOptions.md)
`api_keys` | [{ [key: string]: ApiKeyOptions; }](ApiKeyOptions.md)

## Example

```typescript
import type { WebAuthenticationOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "disabled": null,
  "username": null,
  "password": null,
  "jwt": null,
  "api_keys": null,
} satisfies WebAuthenticationOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WebAuthenticationOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


