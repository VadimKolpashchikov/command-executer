import inquirer from 'inquirer';
import type { PromptType, ReturnPromptType } from './prompt.types.ts';

export class PromptService {
  public async input<T extends PromptType>(message: string, type: T) {
    const { result } = await inquirer.prompt<{
      result: ReturnPromptType<T>;
    }>([
      {
        name: 'result',
        type,
        message,
      },
    ]);

    return result;
  }
}
