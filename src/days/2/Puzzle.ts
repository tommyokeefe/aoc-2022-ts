import { pipe } from 'ts-functional-pipe';

import Puzzle from '../../types/AbstractPuzzle';
import { asReducer } from '../../utils/helpers';

type RpsInput = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';
type RpsSecondaryInput = 'X' | 'Y' | 'Z';
type RpsOption = 'paper' | 'scissors' | 'rock';
type RpsOutcome = 'win' | 'lose' | 'draw';

const RpsOptions: { [K in RpsInput]: RpsOption} = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
};

const RpsOutcomes: { [K in RpsSecondaryInput]: RpsOutcome } = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

const scoreCodex =  {
  rock: {
    rock: 3,
    paper: 6,
    scissors: 0,
  },
  paper: {
    rock: 0,
    paper: 3,
    scissors: 6
  },
  scissors: {
    rock: 6,
    scissors: 3,
    paper: 0,
  },
};

const bonusCodex = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const outcomeCodex: { [K in RpsOption]: { [K in RpsOutcome]: RpsOption } } = {
  rock: {
    win: 'paper',
    lose: 'scissors',
    draw: 'rock',
  },
  paper: {
    win: 'scissors',
    lose: 'rock',
    draw: 'paper',
  },
  scissors: {
    win: 'rock',
    lose: 'paper',
    draw: 'scissors',
  },
};

const parseInput = (text: string): RpsInput[][] => text
  .split('\n')
  .map(line => line.split(' ')) as RpsInput[][];


const getOptions = (input: RpsInput[]): [RpsOption, RpsOption] => {
  const [input1, input2] = input;
  return [RpsOptions[input1], RpsOptions[input2]];
};

const getOptionsAndOutcomes = (input: [RpsInput, RpsSecondaryInput]): [RpsOption, RpsOption] => {
  const [input1, input2] = input;
  const option1 = RpsOptions[input1];
  const option2 = outcomeCodex[option1][RpsOutcomes[input2]];
  return [option1, option2];
};

const getOutcomeScore = (oponentChoice: RpsOption, playerChoice: RpsOption): number => {
  return scoreCodex[oponentChoice][playerChoice];
};

  const getBonusScore = (playerChoice: RpsOption): number => {
    return bonusCodex[playerChoice];
};

const getScore = (choices: RpsOption[]): number => {
  const [oponentChoice, playerChoice] = choices;
  return getOutcomeScore(oponentChoice, playerChoice) + getBonusScore(playerChoice);
};

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): number {
    const playRound = pipe(getOptions, getScore);
    const playRoundReducer = asReducer<RpsInput[]>(playRound);
    const playGame = (input: RpsInput[][]): number => input.reduce(playRoundReducer, 0);
    const solve = pipe(parseInput, playGame);
    return solve(this.input);
  }

  public getFirstExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 15;
  }

  public solveSecond(): number {
    const playRound = pipe(getOptionsAndOutcomes, getScore);
    const playRoundReducer = asReducer<RpsInput[]>(playRound);
    const playGame = (input: RpsInput[][]): number => input.reduce(playRoundReducer, 0);
    const solve = pipe(parseInput, playGame);
    return solve(this.input);
  }

  public getSecondExpectedResult(): number {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 12;
  }
}
