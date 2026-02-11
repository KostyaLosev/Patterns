declare module "fs" {
  export const promises: {
    readFile(path: string, encoding: string): Promise<string>;
    writeFile(path: string, content: string, encoding: string): Promise<void>;
    mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
    rm(path: string, options?: { force?: boolean }): Promise<void>;
  };
}

declare module "path" {
  const path: {
    resolve(...parts: string[]): string;
    dirname(p: string): string;
  };

  export default path;
}

declare const process: {
  cwd(): string;
  exitCode?: number;
};
