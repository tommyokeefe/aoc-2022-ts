import { pipe } from 'ts-functional-pipe';

import Puzzle from '../../types/AbstractPuzzle';
import { asReducer, chunkReducer, getUniques } from '../../utils/helpers';

const alphabet = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];

const splitLine = (input: string): [string[], string[]] => {
  const middle = Math.floor(input.length / 2);
  return [[...input.substring(0, middle)], [...input.substring(middle)]];
};

const findShared = (input: [string[], string[]]): string => {
  const [firstHalf, secondHalf] = input;
  const firstHalfUnique = getUniques(firstHalf);
  const secondHalfUnique = getUniques(secondHalf);
  return firstHalfUnique.filter(item => secondHalfUnique.includes(item))[0];
};

const chunkThreeReducer = chunkReducer<string>(3);

const findGroupShared = (input: string[]): string => {
  const [item1, item2, item3] = input;
  const unique1 = getUniques(item1);
  const unique2 = getUniques(item2);
  const unique3 = getUniques(item3);

  return unique1.filter(item => unique2.includes(item) && unique3.includes(item))[0];
};

const convertToScore = (input: string): number => alphabet.indexOf(input) + 1;

const findPriorityScoreReducer = asReducer<string>(pipe(splitLine, findShared, convertToScore));

const findGroupPriorityScoreReducer = asReducer<string[]>(pipe(findGroupShared, convertToScore));

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    return this.input
      .split('\n')
      .reduce(findPriorityScoreReducer, 0);
  }

  public getFirstExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 157;
  }

  public solveSecond(): number {
    return this.input
      .split('\n')
      .reduce(chunkThreeReducer, [])
      .reduce<number>(findGroupPriorityScoreReducer, 0);
  }

  public getSecondExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 70;
  }
}
