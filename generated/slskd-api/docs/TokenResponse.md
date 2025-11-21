
# TokenResponse


## Properties

Name | Type
------------ | -------------
`expires` | number
`issued` | number
`name` | string
`not_before` | number
`token` | string
`token_type` | string

## Example

```typescript
import type { TokenResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "expires": null,
  "issued": null,
  "name": null,
  "not_before": null,
  "token": null,
  "token_type": null,
} satisfies TokenResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TokenResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


