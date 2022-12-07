import { pipe } from 'ts-functional-pipe';

import Puzzle from '../../types/AbstractPuzzle';
import { maxReducer, totalReducer, toString, sortDesc } from '../../utils/helpers';

const parseInput = (input: string): number[][] => input
    .split('\n\n')
    .map(line => line.split('\n'))
    .map(item => item.map(item => parseInt(item)));

const totalCountPerGroup = (groups: number[][]): number[] => groups.map(group => group.reduce(totalReducer));

const maxCount = (counts: number[]): number => counts.reduce(maxReducer);

const topThreeAndTotal = (calories: number[]): number => calories
    .sort(sortDesc)
    .slice(0, 3)
    .reduce(totalReducer);

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const getMaxCount = pipe(parseInput, totalCountPerGroup, maxCount, toString);
    return getMaxCount(this.input);
  }
  public solveSecond(): string {
    const getTopThreeTotal = pipe(parseInput, totalCountPerGroup, topThreeAndTotal, toString);
    return getTopThreeTotal(this.input);
  }

  public getFirstExpectedResult(): string {
    return '24000';
  }
  public getSecondExpectedResult(): string {
    return '45000';
  }
}
