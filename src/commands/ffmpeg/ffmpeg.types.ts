import type { ICommandExecutor } from '../../core/executor/command.types.ts';

export interface IFfmpegInput {
  width: number;
  height: number;
  path: string;
  name: string;
}

export interface ICommandExecutorFfmpeg extends ICommandExecutor {
  output: string;
}
