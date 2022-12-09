import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    // WRITE SOLUTION FOR TEST 1
    return 1;
  }

  public getFirstExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 1;
  }

  public solveSecond(): number {
    // WRITE SOLUTION FOR TEST 2
    return 1;
  }

  public getSecondExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 1;
  }
}
