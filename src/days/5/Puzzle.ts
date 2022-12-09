import Puzzle from '../../types/AbstractPuzzle';

import { chunkReducer } from '../../utils/helpers';

type TStacks = Record<string, string[]>;
type TInstructions = [number, string, string];
type TMoveCrates = (instructions: TInstructions, stacks: TStacks) => TStacks;
type TMoveCratesReducer = (cargoStacks: TStacks, line: string) => TStacks;

const chunkByFour = chunkReducer<string>(4);

const parseInput = (file: string): [string[], string[]] => {
  const input = file.split('\n');
  const index = input.findIndex(item => item === '');
  return [input.slice(0, index), input.slice(index + 1)];
};

const buildStacks = (output: TStacks, line: string): TStacks => {
  if (Object.keys(output).length === 0) {
    const keys = line.split('').filter(item => item !== ' ');
    return keys.reduce((stack, key) => {
      stack[key] = [];
      return stack;
    }, output);
  }

  return line
    .split('')
    .reduce(chunkByFour, [])
    .map(crate => crate[1])
    .reduce((stack, crate, index) => {
      if (crate !== '' && crate !== ' ') {
        stack[index+1].push(crate);
      }
      return stack;
    }, output);
};

const moveCratesIndividual = (instructions: TInstructions, stacks: TStacks): TStacks => {
  const [count, from, to] = instructions;
  let i = 1;
  while (i <= count) {
    stacks[to].push(stacks[from].pop());
    i++;
  }
  return stacks;
};

const moveCratesGroup = (instructions: TInstructions, stacks: TStacks): TStacks => {
  const [count, from, to] = instructions;
  stacks[to].push(...stacks[from].splice(-count, count));
  return stacks;
};

const extractInstructions = (line: string): TInstructions => {
  const myRegex = /^move\s(\d*)\sfrom\s(\d*)\sto\s(\d*)$/;
  const matches = myRegex.exec(line);
  return [parseInt(matches[1]), matches[2], matches[3]];
};

const moveCratesReducer = (moveCrates: TMoveCrates): TMoveCratesReducer => (cargoStacks: TStacks, line: string): TStacks => {
  const instructions = extractInstructions(line);
  return moveCrates(instructions, cargoStacks);
};

const moveCratesIndividualReducer = moveCratesReducer(moveCratesIndividual);
const moveCratesGroupReducer = moveCratesReducer(moveCratesGroup);

const getMessage = (stacks: TStacks): string => {
  const keys = Object.keys(stacks);
  return keys.reduce((message, key) => {
    return `${message}${stacks[key].pop()}`;
  }, '');
};

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const [crates, instructions] = parseInput(this.input);
    const stacks = crates.reverse().reduce(buildStacks, {});
    const finalStacks = instructions.reduce(moveCratesIndividualReducer, stacks);
    return getMessage(finalStacks);
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'CMZ';
  }

  public solveSecond(): string {
    const [crates, instructions] = parseInput(this.input);
    const stacks = crates.reverse().reduce(buildStacks, {});
    const finalStacks = instructions.reduce(moveCratesGroupReducer, stacks);
    return getMessage(finalStacks);
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'MCD';
  }
}
