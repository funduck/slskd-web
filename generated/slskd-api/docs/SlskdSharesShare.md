
# SlskdSharesShare

A file share.

## Properties

Name | Type
------------ | -------------
`id` | string
`alias` | string
`is_excluded` | boolean
`local_path` | string
`raw` | string
`remote_path` | string
`directories` | number
`files` | number

## Example

```typescript
import type { SlskdSharesShare } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "alias": null,
  "is_excluded": null,
  "local_path": null,
  "raw": null,
  "remote_path": null,
  "directories": null,
  "files": null,
} satisfies SlskdSharesShare

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdSharesShare
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


