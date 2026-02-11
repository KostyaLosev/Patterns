export interface Command<T = void> {
  execute(): Promise<T>;
}
