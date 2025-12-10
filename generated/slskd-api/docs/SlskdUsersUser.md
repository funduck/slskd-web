
# SlskdUsersUser


## Properties

Name | Type
------------ | -------------
`username` | string
`group` | string
`statistics` | [SlskdUsersStatistics](SlskdUsersStatistics.md)
`status` | [SlskdUsersStatus](SlskdUsersStatus.md)

## Example

```typescript
import type { SlskdUsersUser } from ''

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "group": null,
  "statistics": null,
  "status": null,
} satisfies SlskdUsersUser

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdUsersUser
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


