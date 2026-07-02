import Logger from "@app/src/logger.js";
const log = Logger.get("Disposable");

// allows for easy unsubscribing during deconstruction
export const Disposable = {
  create_disposable_scope() {
    const disposables = [];

    return {
      own(disposable) {
        disposables.push(disposable);
      },

      dispose() {
        for (const d of disposables) {
          d();
        }
      }
    };
  }
}