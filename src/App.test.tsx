export const add = (a: number, b: number) => {
  return a + b;
};

it("add correctly", () => {
  expect(add(3, 5)).toBe(8);
});
