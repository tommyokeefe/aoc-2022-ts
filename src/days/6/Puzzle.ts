import Puzzle from '../../types/AbstractPuzzle';

const findMarker = (input: string[], index: number, length: number): number => {
  const potentialMarker = input.slice(index, index + length);
  return new Set(potentialMarker).size === potentialMarker.length ? index + length : findMarker(input, index + 1, length);
};

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    return findMarker(this.input.split(''), 0, 4);
  }

  public getFirstExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 7;
  }

  public solveSecond(): number {
    return findMarker(this.input.split(''), 0, 14);
    return 1;
  }

  public getSecondExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 19;
  }
}
