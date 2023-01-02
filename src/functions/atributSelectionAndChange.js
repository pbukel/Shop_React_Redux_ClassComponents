import { store } from "../index";

export const handleSelection = (atributIndex, atributValueIndex) => {
  const state = store.getState();
  let newParams = structuredClone({ ...state.productInfo });
  newParams.attributes[atributIndex].items.map((x) => (x.isSelected = false));
  newParams.attributes[atributIndex].items[atributValueIndex].isSelected = true;

  store.dispatch({
    type: "SET_PRODUCT_INFO",
    value: newParams,
  });
};
export const handleAtributChangeInBasket = (
  productInBasketIndex,
  atributIndex,
  atributValueIndex
) => {
  const state = store.getState();
  let updatedProduct = structuredClone({
    ...state.basket[productInBasketIndex],
  });

  updatedProduct.attributes[atributIndex].items.map(
    (x) => (x.isSelected = false)
  );
  updatedProduct.attributes[atributIndex].items[
    atributValueIndex
  ].isSelected = true;
  let tarpinis = structuredClone([...state.basket]);
  tarpinis[productInBasketIndex] = updatedProduct;
  store.dispatch({
    type: "SET_NEW_BASKET",
    value: tarpinis,
  });
};
