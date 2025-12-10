
# SlskdUsersStatus

User status.

## Properties

Name | Type
------------ | -------------
`is_privileged` | boolean
`presence` | [SoulseekUserPresence](SoulseekUserPresence.md)

## Example

```typescript
import type { SlskdUsersStatus } from ''

// TODO: Update the object below with actual values
const example = {
  "is_privileged": null,
  "presence": null,
} satisfies SlskdUsersStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdUsersStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


