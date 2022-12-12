import { WeightedGraph } from "./algo.js";
import { checkIfConnected } from "./helper.ts";

const input = await Deno.readTextFile("./input.txt");
const inputArr = input.split(/\n/);

let start = "";
let end = "";

// 1. form graph

const graph = new WeightedGraph();

// add vertex
inputArr.forEach((line, index) => {
  for (let i = 0; i < line.length; i++) {
    graph.addVertex(`row[${index}]-col[${i}]`);

    if (line[i] === "S") {
      start = `row[${index}]-col[${i}]`;
    }

    if (line[i] === "E") {
      end = `row[${index}]-col[${i}]`;
    }
  }
});

// add edge
inputArr.forEach((line, index, arr) => {
  for (let i = 0; i < line.length; i++) {
    if (line[i - 1] && checkIfConnected(line[i], line[i - 1])) {
      graph.addEdge(
        `row[${index}]-col[${i}]`,
        `row[${index}]-col[${i - 1}]`,
        1
      );
    }

    if (line[i + 1] && checkIfConnected(line[i], line[i + 1])) {
      graph.addEdge(
        `row[${index}]-col[${i}]`,
        `row[${index}]-col[${i + 1}]`,
        1
      );
    }

    if (arr[index + 1] && checkIfConnected(line[i], arr[index + 1][i])) {
      graph.addEdge(
        `row[${index}]-col[${i}]`,
        `row[${index + 1}]-col[${i}]`,
        1
      );
    }

    if (arr[index - 1] && checkIfConnected(line[i], arr[index - 1][i])) {
      graph.addEdge(
        `row[${index}]-col[${i}]`,
        `row[${index - 1}]-col[${i}]`,
        1
      );
    }
  }
});

// 2. perform dijkstras algorithm
console.log(graph.Dijkstra(start, end).length - 1);
