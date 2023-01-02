import { store } from "../index";
/* Function to check if there is a product in Cart with same atributes. If Yes adds Qty, if no adds new product to basket. */
export const sameOrDifferentCheck = async (item) => {
  const state = store.getState();
  //all indexes of same product in arra result
  var results = [];
  for (let i = 0; i < state.basket.length; i++) {
    if (state.basket[i].id === item.id) {
      results.push(i);
    }
  }

  //if there is no such item in basket, just add it:
  if (results.length === 0) {
    //adds to basket in REDUX state
    return store.dispatch({
      type: "SET_BASKET",
      value: item,
    });
  }
  //
  let isSameAtribut = [];
  let isSameAtributIndex;

  //working with same product indexes:
  for (let index of results) {
    //if ther is not atributes , just add qty to same product
    if (state.basket[index].attributes.length === 0) {
      return store.dispatch({
        type: "UPDATE_PRODUCT_QTY_IN_BASKET",
        index: index,
      });
    }

    //Cheking all atributs of same product,are they same or not. If same, add qty, if not, adding another prod with different atributes
    let check = state.basket[index].attributes.map((x, i) =>
      x.items.map(
        (y, j) => y.isSelected === item.attributes[i].items[j].isSelected
      )
    );
    for (let iter = 0; iter < check.length; iter++) {
      if (!check[iter].includes(false)) {
        isSameAtribut.push(index);
      } else {
        isSameAtribut.push("no");
      }
    }

    if (isSameAtribut.includes("no")) {
      isSameAtribut = [];
    } else {
      isSameAtributIndex = isSameAtribut[0];
      isSameAtribut = [];
    }
  }

  if (isSameAtributIndex >= 0) {
    store.dispatch({
      type: "UPDATE_PRODUCT_QTY_IN_BASKET",
      index: isSameAtributIndex,
    });
  } else {
    store.dispatch({
      type: "SET_BASKET",
      value: item,
    });
  }
};
