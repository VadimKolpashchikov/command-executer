import { promises } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, isAbsolute, join, normalize } from 'path';

export class FileService {
  private async isExists(path: string): Promise<boolean> {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  public getFilePath(path: string, name: string, extension: string): string {
    if (!isAbsolute(path)) {
      const currentDir = dirname(fileURLToPath(import.meta.url));
      path = join(currentDir, path);
    }

    return normalize(join(dirname(path), `${name}.${extension}`));
  }

  async deleteFileIsExists(path: string) {
    if (await this.isExists(path)) {
      promises.unlink(path);
    }
  }
}
