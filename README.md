# Patterns

Система управления проектами на TypeScript с использованием паттернов:

- **Builder** — поэтапная сборка проекта (`ProjectBuilder`).
- **Composite** — древовидная структура проекта из узлов и задач (`ProjectNode`, `Task`).
- **Iterator** — последовательный обход компонентов проекта (`ProjectIterator`).

## Структура проекта

```text
src/
  app/
    createSampleProject.ts
  domain/
    builder/
      ProjectBuilder.ts
    components/
      ProjectComponent.ts
      ProjectNode.ts
      Task.ts
    iterator/
      ProjectIterator.ts
      ProjectTraversal.ts
    project/
      Project.ts
  index.ts
```

## Запуск

```bash
npm install
npm run build
npm start
```

После запуска в консоль выводятся:

1. Метаданные проекта (название, владелец).
2. Общие оценки по часам и бюджету.
3. Иерархическая структура проекта.
4. Последовательный обход всех элементов через Iterator.
