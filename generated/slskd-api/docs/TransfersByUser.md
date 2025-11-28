
# TransfersByUser

Transfers grouped by username and directory.

## Properties

Name | Type
------------ | -------------
`username` | string
`directories` | [Array&lt;TransferDirectory&gt;](TransferDirectory.md)

## Example

```typescript
import type { TransfersByUser } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "directories": null,
} satisfies TransfersByUser

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TransfersByUser
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


