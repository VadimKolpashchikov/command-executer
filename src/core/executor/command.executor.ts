import type { IStreamLogger } from '../handlers/streamLogger.interface.ts';
import type { ChildProcessWithoutNullStreams } from 'child_process';
import type { ICommandExecutor } from './command.types.ts';

export abstract class CommandExecutor<Input> {
  constructor(private logger: IStreamLogger) {}

  protected abstract prompt(): Promise<Input>;

  protected abstract build(input: Input): ICommandExecutor;

  protected abstract spawn(
    command: ICommandExecutor,
  ): ChildProcessWithoutNullStreams;

  protected abstract processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger,
  ): void;

  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);
    this.processStream(stream, this.logger);
  }
}
