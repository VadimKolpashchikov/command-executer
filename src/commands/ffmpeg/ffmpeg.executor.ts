import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { CommandExecutor } from '../../core/executor/command.executor.ts';
import type { IStreamLogger } from '../../core/handlers/streamLogger.interface.ts';
import type { ICommandExecutorFfmpeg, IFfmpegInput } from './ffmpeg.types.ts';
import { FileService } from '../../core/files/file.service.ts';
import { PromptService } from '../../core/prompt/prompt.service.ts';
import { FfmpegBuilder } from './ffmpeg.builder.ts';
import { StreamHandler } from '../../core/handlers/stream.handler.ts';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected async prompt(): Promise<IFfmpegInput> {
    const width = await this.promptService.input('Введите ширину:', 'number');
    const height = await this.promptService.input('Введите высоту:', 'number');
    const path = await this.promptService.input(
      'Введите путь до файла:',
      'input',
    );
    const name = await this.promptService.input(
      'Введите имя нового файла:',
      'input',
    );

    return {
      width,
      height,
      path,
      name,
    };
  }

  protected build({
    width,
    height,
    path,
    name,
  }: IFfmpegInput): ICommandExecutorFfmpeg {
    const output = this.fileService.getFilePath(path, name, 'mp4');
    const args = new FfmpegBuilder()
      .input(path)
      .setSize(width, height)
      .output(output);

    return { command: 'ffmpeg', args, output };
  }

  protected async spawn({
    command,
    args,
    output,
  }: ICommandExecutorFfmpeg): Promise<ChildProcessWithoutNullStreams> {
    await this.fileService.deleteFileIsExists(output);

    return spawn(command, args);
  }

  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger,
  ): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}
