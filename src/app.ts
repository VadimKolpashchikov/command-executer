import { FfmpegExecutor } from './commands/ffmpeg/ffmpeg.executor.ts';
import { ConsoleLogger } from './out/consoleLogger/consoleLogger.ts';

class App {
  async run() {
    new FfmpegExecutor(ConsoleLogger.getInstance()).execute();
  }
}

const app = new App();
app.run();
