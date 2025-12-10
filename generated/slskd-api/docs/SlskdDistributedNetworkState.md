
# SlskdDistributedNetworkState


## Properties

Name | Type
------------ | -------------
`branch_level` | number
`branch_root` | string
`can_accept_children` | boolean
`child_limit` | number
`children` | Array&lt;string&gt;
`has_parent` | boolean
`is_branch_root` | boolean
`parent` | string

## Example

```typescript
import type { SlskdDistributedNetworkState } from ''

// TODO: Update the object below with actual values
const example = {
  "branch_level": null,
  "branch_root": null,
  "can_accept_children": null,
  "child_limit": null,
  "children": null,
  "has_parent": null,
  "is_branch_root": null,
  "parent": null,
} satisfies SlskdDistributedNetworkState

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SlskdDistributedNetworkState
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


