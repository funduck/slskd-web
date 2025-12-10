
# SlskdState

Application service state.

## Properties

Name | Type
------------ | -------------
`version` | [SlskdVersionState](SlskdVersionState.md)
`pending_reconnect` | boolean
`pending_restart` | boolean
`server` | [SlskdServerState](SlskdServerState.md)
`connection_watchdog` | [SlskdServerConnectionWatchdogState](SlskdServerConnectionWatchdogState.md)
`relay` | [SlskdRelayState](SlskdRelayState.md)
`user` | [SlskdUserState](SlskdUserState.md)
`distributed_network` | [SlskdDistributedNetworkState](SlskdDistributedNetworkState.md)
`shares` | [SlskdShareState](SlskdShareState.md)
`rooms` | Array&lt;string&gt;
`users` | [Array&lt;SlskdUsersUser&gt;](SlskdUsersUser.md)

## Example

```typescript
import type { SlskdState } from ''

// TODO: Update the object below with actual values
const example = {
  "version": null,
  "pending_reconnect": null,
  "pending_restart": null,
  "server": null,
  "connection_watchdog": null,
  "relay": null,
  "user": null,
  "distributed_network": null,
  "shares": null,
  "rooms": null,
  "users": null,
} satisfies SlskdState

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdState
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


