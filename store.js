import { Utility } from "@app/utility.js";

export const Store = {
  createStore(initialState) {
    let state = structuredClone(initialState);

    const subscriptions = [];

    function getState() {
      return state;
    }

    function setState(updater) {
      const previousState = state;

      state = typeof updater === "function" ? updater(state)
          : {...state, ...updater};

      for (const sub of subscriptions) {
        const previousValue = sub.selector(previousState);
        const currentValue = sub.selector(state);

        // if (!Object.is(previousValue, currentValue)) {
        if (!Utility.shallowEqual(previousValue, currentValue)) {
          sub.callback(currentValue, previousValue);
        }
      }
    }

    function subscribe(selector, callback) {
      const subscription = {selector, callback};

      subscriptions.push(subscription);

      return () => {
        const index = subscriptions.indexOf(subscription);

        if (index >= 0) {
          subscriptions.splice(index, 1);
        }
      };
    }

    return {
      getState, setState, subscribe
    };
  }
}