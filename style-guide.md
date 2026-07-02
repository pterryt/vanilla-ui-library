
# JavaScript Style Guide

##  General Principles
When multiple solutions are acceptable:

1. Prefer readability.
2. Prefer consistency.
3. Optimize for long-term maintenance.

---

# Formatting

## Line Length

**Rule**

* Maximum line length is **79 characters**.

**Reason**

This project is primarily developed in terminal editors and tmux. A
79-character limit keeps code readable in narrow panes without horizontal
scrolling.

---

## Indentation

**Rule**

* Use **2 spaces**.
* Never use tabs.

---

## Braces

**Rule**

Always use braces, even for single-line statements.

**Good**

```js
if (ready) {
  start();
}
```

**Avoid**

```js
if (ready)
  start();
```

---

## Semicolons

**Rule**

Always terminate statements with semicolons.

---

## Quotes

**Rule**

* Prefer single quotes (`'`).
* Use template literals only when interpolation or multiline strings are
  required.

---

## Trailing Commas

**Rule**

Use trailing commas wherever JavaScript allows them.

Example:

```js
const options = {
  timeout: 5000,
  retries: 3,
};
```

---

## Blank Lines

Separate logical sections with blank lines.

Avoid unnecessary vertical whitespace.

---

# Naming

## Variables

Use **camelCase**.

```js
const totalPrice = 10;
```

---

## Constants

Use camelCase for normal constants.

Use UPPER_SNAKE_CASE only for true application-wide constants.

```js
const timeout = 5000;

const MAX_RETRIES = 5;
```

---

## Classes

Use PascalCase.

```js
class BinaryHeap {}
```

---

# Functions


## Function Size

Functions should have one responsibility.

If a function becomes difficult to understand, consider extracting helper
functions.

---

## Parameters

Prefer three or fewer parameters.

If additional configuration is required, use an options object.

```js
createUser({
  name,
  email,
  age,
});
```

---

## Early Returns

Prefer early returns over deep nesting.

Good:

```js
if (!user) {
  return;
}

process(user);
```

Avoid:

```js
if (user) {
  process(user);
}
```

---

# Variables

Prefer `const`.

Use `let` only when reassignment is required.

Never use `var`.

---

# Equality

Always use strict equality.

```js
===

!==
```

Never use:

```js
==

!=
```

---

# Imports

Group imports in this order:

1. Standard library
2. Third-party packages
3. Project modules
4. Relative imports

Alphabetize within each group.

---

# Error Handling

Throw `Error` objects.

```js
throw new Error('Invalid token.');
```

Never throw strings.

---

# Logging

Use the project's logging utility.

Avoid committing `console.log()` statements.

---

# Documentation

## JSDoc

Document:

* exported functions
* public classes
* non-obvious behavior

Avoid documenting code that is already self-explanatory.

## Git Commits

- Make commits small and focused.
- Each commit should represent a single logical change.
- Write commit messages in the imperative mood (e.g., "Add", "Fix", "Refactor").

### Commit Format

```
<tag>: Short description
```

### Commit Tags

| Tag | Purpose |
|------|---------|
| `feat` | New functionality or features |
| `fix` | Bug fixes |
| `refactor` | Code changes that don't alter behavior |
| `perf` | Performance improvements |
| `style` | Formatting or stylistic changes (no behavioral changes) |
| `test` | Add or modify tests |
| `docs` | Documentation changes |
| `build` | Build system, dependencies, tooling configuration |
| `ops` | Deployment, infrastructure, CI/CD, scripts, environment |
| `chore` | Maintenance tasks that don't fit another category |

### Examples

```
feat: Add binary heap implementation
fix: Prevent duplicate translations
refactor: Split tokenizer into separate module
```
