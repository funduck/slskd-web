
# ConnectionOptions

Connection options.

## Properties

Name | Type
------------ | -------------
`timeout` | [TimeoutOptions](TimeoutOptions.md)
`buffer` | [BufferOptions](BufferOptions.md)
`proxy` | [ProxyOptions](ProxyOptions.md)

## Example

```typescript
import type { ConnectionOptions } from ''

// TODO: Update the object below with actual values
const example = {
  "timeout": null,
  "buffer": null,
  "proxy": null,
} satisfies ConnectionOptions

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ConnectionOptions
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


