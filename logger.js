// logger.js
//
// Usage:
//   import Logger from "./logger.js";
//   const log = Logger.get("API");
//
//   log.info("Login succeeded", { userId, ip });
//   log.debug(() => `expensive: ${computeExpensiveThing()}`); // only runs if DEBUG is enabled
//
//   const users = log.child("Users"); // logs as "API:Users"
//
//   log.time("db-query");
//   ...
//   log.timeEnd("db-query"); // logs "db-query: 12.34ms" with { duration }
//
//   Logger.configure({ level: "debug", timestamps: true, console: true, file: true });

const isNode = typeof process !== "undefined" && !!(process.versions && process.versions.node);
const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Error);
}

// Preserves Error name/message/stack when serializing to JSON (they're otherwise dropped).
function jsonReplacer(key, value) {
  if (value instanceof Error) {
    return { name: value.name, message: value.message, stack: value.stack };
  }
  return value;
}

class Logger {
  static LEVELS = {
    TRACE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    FATAL: 5,
    OFF: 6
  };
  static level = Logger.LEVELS.DEBUG;
  static modules = new Map();
  static disabledModules = new Set();
  static sinks = [];
  static timestamps = true;
  static _timers = new Map();
  static _fileSink = null;

  static get(name) {
    if (!this.modules.has(name)) {
      this.modules.set(name, new ModuleLogger(name));
    }
    return this.modules.get(name);
  }

  static addSink(fn) {
    this.sinks.push(fn);
  }

  static clearSinks() {
    this.sinks = [];
  }

  static setLevel(level) {
    this.level = this.LEVELS[level.toUpperCase()];
  }

  static disableModule(name) {
    this.disabledModules.add(name);
  }

  static enableModule(name) {
    this.disabledModules.delete(name);
  }

  // One-shot setup: Logger.configure({ level, timestamps, console, file, filePath })
  static configure({ level, timestamps, console: useConsole, file, filePath } = {}) {
    if (level !== undefined) this.setLevel(level);
    if (timestamps !== undefined) this.timestamps = timestamps;

    if (useConsole !== undefined) {
      if (useConsole) {
        if (!this.sinks.includes(consoleSink)) this.sinks.push(consoleSink);
      } else {
        this.sinks = this.sinks.filter(s => s !== consoleSink);
      }
    }

    if (file !== undefined) {
      if (file) {
        if (!isNode) {
          console.warn("[Logger] file sink is not supported in the browser; ignoring.");
        } else {
          this._fileSink = this._fileSink || createFileSink(filePath || "app.log");
          if (!this.sinks.includes(this._fileSink)) this.sinks.push(this._fileSink);
        }
      } else if (this._fileSink) {
        this.sinks = this.sinks.filter(s => s !== this._fileSink);
      }
    }
  }

  static log(levelName, module, rawArgs) {
    const level = this.LEVELS[levelName];
    if (level < this.level) return;
    if (this.disabledModules.has(module)) return;

    // Lazy evaluation: functions in args are only called once we know this log will fire.
    const args = rawArgs.map(a => (typeof a === "function" ? a() : a));

    const message = typeof args[0] === "string" ? args[0] : undefined;
    const rest = message !== undefined ? args.slice(1) : args;
    const meta = rest.length === 0 ? undefined : rest.length === 1 && isPlainObject(rest[0]) ? rest[0] : rest;

    const timestamp = this.timestamps
        ? new Date().toLocaleTimeString() + "." + String(new Date().getMilliseconds()).padStart(3, "0")
        : "";

    const entry = { timestamp, level: levelName, module, message, meta, args };

    for (const sink of this.sinks) sink(entry);
  }
}

class ModuleLogger {
  constructor(name) {
    this.name = name;
  }

  trace(...args) { Logger.log("TRACE", this.name, args); }
  debug(...args) { Logger.log("DEBUG", this.name, args); }
  info(...args)  { Logger.log("INFO", this.name, args); }
  warn(...args)  { Logger.log("WARN", this.name, args); }
  error(...args) { Logger.log("ERROR", this.name, args); }
  fatal(...args) { Logger.log("FATAL", this.name, args); }

  // Namespaced sub-logger, e.g. Logger.get("API").child("Users") -> "API:Users"
  child(name) {
    return Logger.get(`${this.name}:${name}`);
  }

  time(label) {
    Logger._timers.set(`${this.name}:${label}`, now());
  }

  timeEnd(label, level = "DEBUG") {
    const key = `${this.name}:${label}`;
    const start = Logger._timers.get(key);
    if (start === undefined) {
      this.warn(`Timer "${label}" does not exist`);
      return;
    }
    Logger._timers.delete(key);
    const duration = now() - start;
    Logger.log(level.toUpperCase(), this.name, [`${label}: ${duration.toFixed(2)}ms`, { duration }]);
  }
}

function consoleSink(entry) {
  console.log(
      `[${entry.timestamp}]`,
      `[${entry.level}]`,
      `[${entry.module}]`,
      ...entry.args
  );
}

// Created lazily so bundlers targeting the browser never need to resolve "node:fs".
function createFileSink(filePath) {
  let fsPromise;
  const getFs = () => fsPromise || (fsPromise = import("node:fs"));

  return entry => {
    const line = JSON.stringify(
        { timestamp: entry.timestamp, level: entry.level, module: entry.module, message: entry.message, meta: entry.meta },
        jsonReplacer
    ) + "\n";
    getFs().then(fs => fs.appendFile(filePath, line, () => {}));
  };
}

Logger.addSink(consoleSink);

export default Logger;