import { store } from "../index";

// Add prod qty
export const add = (productInBasketIndex) => {
  const state = store.getState();
  const newState = structuredClone([...state.basket]);
  newState[productInBasketIndex].qty = newState[productInBasketIndex].qty + 1;
  store.dispatch({
    type: "SET_NEW_BASKET",
    value: newState,
  });
  /* Updating basket Qty */

  let qtyCalculations = newState.map((x) => x.qty);
  let totalqty = qtyCalculations.reduce(function (a, b) {
    return a + b;
  }, 0);

  store.dispatch({
    type: "SET_QTY",
    value: totalqty,
  });
};
// Minus prod qty
export const remove = (productInBasketIndex) => {
  const state = store.getState();
  const newState = structuredClone([...state.basket]);
  newState[productInBasketIndex].qty = newState[productInBasketIndex].qty - 1;
  if (newState[productInBasketIndex].qty === 0) {
    newState.splice(productInBasketIndex, 1);
    store.dispatch({
      type: "SET_NEW_BASKET",
      value: newState,
    });
  }

  store.dispatch({
    type: "SET_NEW_BASKET",
    value: newState,
  });
  /* Updating basket Qty */

  let qtyCalculations = newState.map((x) => x.qty);
  let totalqty = qtyCalculations.reduce(function (a, b) {
    return a + b;
  }, 0);

  store.dispatch({
    type: "SET_QTY",
    value: totalqty,
  });
};
