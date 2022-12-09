import { pipe } from 'ts-functional-pipe';

import Puzzle from '../../types/AbstractPuzzle';
import { asReducer } from '../../utils/helpers';

/**
 * split input into lines
 * for each line:
 * split at comma
 * convert range to array of numbers
 * check to see if one is fully contained by another
 * reduce result to ge the total count
 */

function* range(start: number, end: number): Generator<number> {
  while (start <= end) {
    yield start;
    start += 1;
  }
}

const pairToRange = (input: string): number[] => {
  const [start, end] = input.split('-');
  return Array.from(range(parseInt(start), parseInt(end)));
};

const getRanges = (input: string): [number[], number[]] => {
  const [first, second] = input.split(',');
  return [pairToRange(first), pairToRange(second)];

};

const compareRanges = (ranges: [number[], number[]]): boolean => {
  const [first, second] = ranges;

  if (first.length < second.length) {
    return first.every(item => second.includes(item));
  } else {
    return second.every(item => first.includes(item));
  }
};

const rangesOverlap = (ranges: [number[], number[]]): boolean => {
  const [first, second] = ranges;
  return first.some(item => second.includes(item));
};

const getScoreFromResult = (result: boolean): number => result ? 1 : 0;

const rangeReducer = asReducer<string>(pipe(getRanges, compareRanges, getScoreFromResult));

const rangeReducer2 = asReducer<string>(pipe(getRanges, rangesOverlap, getScoreFromResult));

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    return this.input
      .split('\n')
      .reduce(rangeReducer, 0);
  }

  public getFirstExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 2;
  }

  public solveSecond(): number {
    // WRITE SOLUTION FOR TEST 2
        return this.input
      .split('\n')
      .reduce(rangeReducer2, 0);
  }

  public getSecondExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 4;
  }
}
