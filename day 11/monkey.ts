export class Monkey {
  index: number;
  items: number[];
  operation: (old: number) => number;
  testDivisible: number;
  trueMonkey: number;
  falseMonkey: number;
  inspected: number;

  constructor(
    index: number,
    items: number[],
    operation: (old: number) => number,
    testDivisible: number,
    trueMonkey: number,
    falseMonkey: number
  ) {
    this.index = index;
    this.items = [...items];
    this.operation = operation;
    this.testDivisible = testDivisible;
    this.trueMonkey = trueMonkey;
    this.falseMonkey = falseMonkey;
    this.inspected = 0;
  }
}
