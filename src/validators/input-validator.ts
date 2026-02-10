import { NUMBER_TOKEN_REGEX, WHITESPACE_SPLIT_REGEX } from '../constants/regex.js';

export class InputValidator {
  public isValidNumberList(line: string, expectedCount: number): boolean {
    const tokens = line.trim().split(WHITESPACE_SPLIT_REGEX);

    if (tokens.length !== expectedCount) {
      return false;
    }

    return tokens.every((token) => NUMBER_TOKEN_REGEX.test(token));
  }

  public parseNumbers(line: string): number[] {
    return line.trim().split(WHITESPACE_SPLIT_REGEX).map(Number);
  }
}
