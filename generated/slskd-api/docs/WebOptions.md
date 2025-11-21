
# WebOptions

Web server options.

## Properties

Name | Type
------------ | -------------
`port` | number
`socket` | string
`https` | [HttpsOptions](HttpsOptions.md)
`url_base` | string
`content_path` | string
`logging` | boolean
`authentication` | [WebAuthenticationOptions](WebAuthenticationOptions.md)

## Example

```typescript
import type { WebOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "port": null,
  "socket": null,
  "https": null,
  "url_base": null,
  "content_path": null,
  "logging": null,
  "authentication": null,
} satisfies WebOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WebOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


