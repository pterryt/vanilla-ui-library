import {Utility} from "@app/src/utility.js";
import Logger from "@app/src/logger.js";

const log = Logger.get("Store");

/**
 * A simple observable state store with selector-based subscriptions.
 */
export const Store = {
  /**
   * Creates a new store instance with its own isolated state and subscribers.
   *
   * @param {Object} initialState - The initial state object. It is deep-cloned,
   *   so mutations to the original object after creation will not affect the store.
   * @returns {{
   *   getState: () => Object,
   *   setState: (updater: Object|((state: Object) => Object)) => void,
   *   subscribe: (selector: (state: Object) => *, callback: (currentValue: *, previousValue: *) => void) => () => void
   * }} The store API.
   */
  createStore(initialState) {
    log.debug("Creating store", {
      initialKeys: Object.keys(initialState)
    });

    /** @type {Object} The current store state. */
    let state = structuredClone(initialState);

    /**
     * Active subscriptions, each pairing a selector with its callback.
     * @type {Array<{selector: (state: Object) => *, callback: (currentValue: *, previousValue: *) => void}>}
     */
    const subscriptions = [];

    /**
     * Returns the current state.
     *
     * @returns {Object} The current state object.
     */
    function getState() {
      return state;
    }

    /**
     * Updates the state, either by merging a partial state object or by applying
     * an updater function. After updating, notifies subscribers whose selected
     * value has shallowly changed.
     *
     * @param {Object|((state: Object) => Object)} updater - Either a partial state
     *   object to shallow-merge into the current state, or a function that receives
     *   the current state and returns the new state.
     * @returns {void}
     */
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

      log.trace("State updated", () => ({
        previous: previousState, current: state
      }));
    }

    /**
     * Subscribes to changes in a derived slice of state. The callback fires
     * only when the selected value changes (per shallow equality).
     *
     * @param {(state: Object) => *} selector - Function that derives a value from the state.
     * @param {(currentValue: *, previousValue: *) => void} callback - Invoked with the
     *   new and previous selected values when they differ.
     * @returns {() => void} An unsubscribe function that removes this subscription.
     */
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
