import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// 테스트코드 파일 : sum.test.ts

export const add = (a: number, b: number) => {
  return a + b;
};

it("add correctly", () => {
  expect(add(3, 5)).toBe(8);
});
