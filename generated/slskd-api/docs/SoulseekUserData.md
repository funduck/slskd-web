
# SoulseekUserData


## Properties

Name | Type
------------ | -------------
`average_speed` | number
`country_code` | string
`directory_count` | number
`file_count` | number
`slots_free` | number
`status` | [SoulseekUserPresence](SoulseekUserPresence.md)
`upload_count` | number
`username` | string

## Example

```typescript
import type { SoulseekUserData } from ''

// TODO: Update the object below with actual values
const example = {
  "average_speed": null,
  "country_code": null,
  "directory_count": null,
  "file_count": null,
  "slots_free": null,
  "status": null,
  "upload_count": null,
  "username": null,
} satisfies SoulseekUserData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SoulseekUserData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


