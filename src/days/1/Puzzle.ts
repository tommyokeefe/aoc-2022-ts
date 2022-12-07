import { pipe } from 'ts-functional-pipe';

import Puzzle from '../../types/AbstractPuzzle';
import { maxReducer, totalReducer, sortDesc } from '../../utils/helpers';

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
  public solveFirst(): number {
    const getMaxCount = pipe(parseInput, totalCountPerGroup, maxCount);
    return getMaxCount(this.input);
  }
  public solveSecond(): number {
    const getTopThreeTotal = pipe(parseInput, totalCountPerGroup, topThreeAndTotal);
    return getTopThreeTotal(this.input);
  }

  public getFirstExpectedResult(): number {
    return 24000;
  }
  public getSecondExpectedResult(): number {
    return 45000;
  }
}
