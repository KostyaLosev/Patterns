# Patterns

Пример системы управления доступом к файлам на TypeScript с использованием паттернов **Proxy** и **Command**.

## Что реализовано

- **Proxy (`AccessProxyFileService`)** — проверяет права пользователя перед любым действием над файлом (`read`, `write`, `delete`).
- **Command**:
  - `ReadFileCommand`
  - `WriteFileCommand`
  - `DeleteFileCommand`
- **Invoker (`FileCommandInvoker`)** — единая точка выполнения команд.
- **RealFileService** — реальная работа с файловой системой.

## Архитектура проекта

```text
src/
  app/
    demo.ts
  commands/
    read-file-command.ts
    write-file-command.ts
    delete-file-command.ts
  domain/
    access-policy.ts
    command.ts
    file-action.ts
    file-service.ts
  invoker/
    file-command-invoker.ts
  proxy/
    access-proxy-file-service.ts
  services/
    real-file-service.ts
  index.ts
```

## Запуск

```bash
npm install
npm run build
npm start
```

## Сценарий демо

1. `admin` записывает файл.
2. `viewer` читает файл.
3. `viewer` пытается удалить файл и получает ошибку доступа.
4. `admin` удаляет файл успешно.
