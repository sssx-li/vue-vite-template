import { describe, expect, test } from "vitest";
import { arr2map } from "@/utils/arr2map";

const arr = [
  { label: "key", value: "value" },
  { label: "key1", value: "value1" },
];

describe("utils/arr2map", () => {
  test("arr2map 值是否转换正确", () => {
    expect(arr2map(arr)).toStrictEqual({ value: "key", value1: "key1" });
  });
});
