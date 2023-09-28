import { expect, test } from "bun:test";
import generateCompose from "./generateCompose";

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});

test("Should generate YAML", () => {
  const output = generateCompose(["app1", "app2"]);
  expect(output?.services?.app1).not.toBe(undefined);
  expect(output?.services?.app2).not.toBe(undefined);
});
