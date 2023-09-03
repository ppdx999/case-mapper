# case-mapper

# Install

```
$ npm i case-mapper
```

# Usage

```ts
import {
  camelToSnake,
  camelToSnakeKeys,
  snakeToCamel,
  snakeToCamelKeys,
} from "case-mapper";

camelToSnake("fooBar")  // --> "foo_bar"
snakeToCamel("foo_bar") // --> "fooBar"


camelToSnakeKeys({ fooBar: "baz", barBaz: { fooBar: "baz" } })
// --> { foo_bar: "baz", bar_baz: { foo_bar: "baz" }}

snakeToCamelKeys({ foo_bar: "baz", bar_baz: { foo_bar: "baz" } })
// --> { fooBar: "baz", barBaz: { fooBar: "baz" }}
```
