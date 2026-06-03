import { PromptService } from './core/prompt/prompt.service.ts';

class App {
  async run() {
    const result = await new PromptService().input('Enter your name:', 'input');

    console.log(result);
  }
}

const app = new App();
app.run();
