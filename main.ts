import fs from "fs";
import path from "path";
// import dotenv from "dotenv";
import 'dotenv/config'
import { createLanguageModel, createJsonTranslator, processRequests } from "typechat";
import { Problem } from "./problemFormulationSchema";

// TODO: use local .env file.
// dotenv.config({ path: path.join(__dirname, "./.env") });
// console.log(dotenv)
// console.log(process.env)
// debugger
debugger
const model = createLanguageModel(process.env);
const schema = fs.readFileSync(path.join(__dirname, "../problemFormulationSchema.ts"), "utf8");
const translator = createJsonTranslator<Problem>(model, schema, "Problem");

// Process requests interactively or from the input file specified on the command line
processRequests("> ", process.argv[2], async (request) => {
  console.log('Processing...')
  const response = await translator.translate(request);
  if (!response.success) {
      console.log(response.message);
      return;
  }
  const problem = response.data;
  console.log(JSON.stringify(problem, undefined, 2));
  // if (problem.items.some(item => item.type === "unknown")) {
  //     console.log("I didn't understand the following:");
  //     for (const item of problem.items) {
  //         if (item.type === "unknown") console.log(item.text);
  //     }
  //     return;
  // }
  // processOrder(problem);
  // console.log("Success!");
});
/*

The initial state of the problem is that we have a cat that owns nothing: []. Our choices are to give the cat a hat, a bat, or a rat. The goal condition of the problem is that the cat has a hat and a bat. All states are legal.

The initial state of the problem is:
{
  "leftBank": {
    "missionaries": 3,
    "cannibals": 3,
    "boat": true
  },
  "rightBank": {
    "missionaries": 0,
    "cannibals": 0,
    "boat": false
  }
}

The set of operators that can be applied to states is:
[
  "Move 2 missionaries from left to right",
  "Move 2 missionaries from right to left",
  "Move 1 missionary from left to right",
  "Move 1 missionary from right to left",
  "Move 2 cannibals from left to right",
  "Move 2 cannibals from right to left",
  "Move 1 cannibal from left to right",
  "Move 1 cannibal from right to left",
  "Move 1 missionary and 1 cannibal from left to right",
  "Move 1 missionary and 1 cannibal from right to left"
]

As arrow functions:
[
  (state: State) => {
    const newState = { ...state };
    newState.leftBank.missionaries -= 2;
    newState.rightBank.missionaries += 2;
    newState.leftBank.boat = false;
    newState.rightBank.boat = true;
    return newState;
  },
  ... etc.
]

A state is only legal if:
(state: State) => {
  const leftBank = state.leftBank;
  const rightBank = state.rightBank;
  return (
    leftBank.missionaries >= 0 &&
    leftBank.cannibals >= 0 &&
    rightBank.missionaries >= 0 &&
    rightBank.cannibals >= 0 &&
    (leftBank.missionaries === 0 || leftBank.missionaries >= leftBank.cannibals) &&
    (rightBank.missionaries === 0 || rightBank.missionaries >= rightBank.cannibals)
  );
}

The goal condition of the problem is:
{
  "leftBank": {
    "missionaries": 0,
    "cannibals": 0,
    "boat": false
  },
  "rightBank": {
    "missionaries": 3,
    "cannibals": 3,
    "boat": true
  }
}


*/