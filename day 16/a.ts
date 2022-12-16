import { capturingRegex } from "./helper.ts";
import { WeightedGraph } from "./algo.js";

const input = await Deno.readTextFile("./input.txt");

const TIME_BEFORE_ERUPT = 30;

const START = "AA";

const valveFlowrates = new Map<string, number>();

const graph = new WeightedGraph();

// parse
input.split(/\n/).forEach((line) => {
  const [_, valve, flowRate, leadTos] = line.match(
    capturingRegex
  ) as RegExpMatchArray;

  graph.addVertex(valve);

  leadTos.split(", ").forEach((leadTo) => {
    graph.addEdge(valve, leadTo, 1);
  });

  if (+flowRate > 0) valveFlowrates.set(valve, +flowRate);
});

const memo = new Map<string, number>();

const dp = (
  currentValve: string,
  minuteLeft: number,
  remainingValves: string[]
): number => {
  if (
    memo.has(`${currentValve}-${minuteLeft}-${JSON.stringify(remainingValves)}`)
  ) {
    return memo.get(
      `${currentValve}-${minuteLeft}-${JSON.stringify(remainingValves)}`
    ) as number;
  }

  if (remainingValves.length === 1) {
    const distance = graph.Dijkstra(currentValve, remainingValves[0]);
    if (distance > minuteLeft) {
      memo.set(
        `${currentValve}-${minuteLeft}-${JSON.stringify(remainingValves)}`,
        0
      );
      return 0;
    }

    const total =
      (minuteLeft - distance) *
      (valveFlowrates.get(remainingValves[0]) as number);

    memo.set(
      `${currentValve}-${minuteLeft}-${JSON.stringify(remainingValves)}`,
      total
    );

    return total;
  }

  const everything = remainingValves.map((remainingValve) => {
    const distance = graph.Dijkstra(currentValve, remainingValve);

    if (distance > minuteLeft) {
      memo.set(
        `${currentValve}-${minuteLeft}-${JSON.stringify(remainingValves)}`,
        0
      );
      return 0;
    }

    const total =
      (minuteLeft - distance) * (valveFlowrates.get(remainingValve) as number);

    const newArr = [...remainingValves].filter((v) => v !== remainingValve);

    const newTotal = total + dp(remainingValve, minuteLeft - distance, newArr);

    memo.set(
      `${currentValve}-${minuteLeft}-${JSON.stringify(remainingValves)}`,
      newTotal
    );

    return newTotal;
  });

  return Math.max(...everything);
};

const result2 = dp(START, TIME_BEFORE_ERUPT, [...valveFlowrates.keys()]);

console.log(result2);
