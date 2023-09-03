import { assertEquals } from "https://deno.land/std@0.200.0/assert/mod.ts";
import {
  camelToSnake,
  camelToSnakeKeys,
  snakeToCamel,
  snakeToCamelKeys,
} from "./case-mapper.ts";

const test = Deno.test;

test("camelToSnake", () => {
  assertEquals(camelToSnake("fooBar"), "foo_bar");
  assertEquals(camelToSnake("fooBarBaz"), "foo_bar_baz");
  assertEquals(camelToSnake("foo"), "foo");
  assertEquals(camelToSnake("fooBarBaz"), "foo_bar_baz");
  assertEquals(camelToSnake("fooBAR"), "foo_b_a_r");
  assertEquals(camelToSnake("fooBar123"), "foo_bar123");
  assertEquals(camelToSnake("foo123Bar"), "foo123_bar");
  assertEquals(camelToSnake("123Foo"), "123_foo");
  assertEquals(camelToSnake("123Foo456"), "123_foo456");
  assertEquals(camelToSnake("fooBARBaz"), "foo_b_a_r_baz");
});

test("snakeToCamel", () => {
  assertEquals(snakeToCamel("foo_bar"), "fooBar");
  assertEquals(snakeToCamel("foo_bar_baz"), "fooBarBaz");
  assertEquals(snakeToCamel("foo"), "foo");
  assertEquals(snakeToCamel("foo_bar_baz"), "fooBarBaz");
  assertEquals(snakeToCamel("foo_b_a_r"), "fooBAR");
  assertEquals(snakeToCamel("foo_bar123"), "fooBar123");
  assertEquals(snakeToCamel("foo123_bar"), "foo123Bar");
  assertEquals(snakeToCamel("123_foo"), "123Foo");
  assertEquals(snakeToCamel("123_foo456"), "123Foo456");
  assertEquals(snakeToCamel("foo_b_a_r_baz"), "fooBARBaz");
});

test("camelToSnakeKeys", () => {
  assertEquals(camelToSnakeKeys({ fooBar: "baz" }), { foo_bar: "baz" });
  assertEquals(camelToSnakeKeys({ fooBar: "baz", barBaz: "foo" }), {
    foo_bar: "baz",
    bar_baz: "foo",
  });
  assertEquals(camelToSnakeKeys({ fooBar: "baz", barBaz: { fooBar: "baz" } }), {
    foo_bar: "baz",
    bar_baz: { foo_bar: "baz" },
  });
  assertEquals(
    camelToSnakeKeys({ fooBar: "baz", barBaz: [{ fooBar: "baz" }] }),
    {
      foo_bar: "baz",
      bar_baz: [{ foo_bar: "baz" }],
    },
  );
});

test("snakeToCamelKeys", () => {
  assertEquals(snakeToCamelKeys({ foo_bar: "baz" }), { fooBar: "baz" });
  assertEquals(snakeToCamelKeys({ foo_bar: "baz", bar_baz: "foo" }), {
    fooBar: "baz",
    barBaz: "foo",
  });
  assertEquals(
    snakeToCamelKeys({ foo_bar: "baz", bar_baz: { foo_bar: "baz" } }),
    {
      fooBar: "baz",
      barBaz: { fooBar: "baz" },
    },
  );
  assertEquals(
    snakeToCamelKeys({ foo_bar: "baz", bar_baz: [{ foo_bar: "baz" }] }),
    {
      fooBar: "baz",
      barBaz: [{ fooBar: "baz" }],
    },
  );
});
