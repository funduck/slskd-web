
# PushbulletOptions

Pushbullet options.

## Properties

Name | Type
------------ | -------------
`enabled` | boolean
`access_token` | string
`notification_prefix` | string
`notify_on_private_message` | boolean
`notify_on_room_mention` | boolean
`retry_attempts` | number
`cooldown_time` | number

## Example

```typescript
import type { PushbulletOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "enabled": null,
  "access_token": null,
  "notification_prefix": null,
  "notify_on_private_message": null,
  "notify_on_room_mention": null,
  "retry_attempts": null,
  "cooldown_time": null,
} satisfies PushbulletOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PushbulletOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


