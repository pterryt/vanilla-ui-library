// mixin for disposable objects with subscriptions
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