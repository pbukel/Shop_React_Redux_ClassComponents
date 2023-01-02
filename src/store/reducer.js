const initialState = {
  categories: null,
  selectedCategory: "all",
  age: 21,
  qty: 0,
  showSmallCart: false,
  showCurrency: false,
  selectedCurrency: {},
  allCurrency: "",
  basket: [],
  totalAmount: 0,
  productInfo: null,
  productCopy: null,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "SET_CATEGORIES":
      newState.categories = action.value;
      break;
    case "SET_SELECTED_CATEGORY":
      newState.selectedCategory = action.value;
      break;

    case "SET_SHOW_SMALL_CART":
      newState.showSmallCart =
        action.value === false ? false : !state.showSmallCart;
      break;
    case "SET_SHOW_CURRENCY":
      newState.showCurrency =
        action.value === false ? false : !state.showCurrency;
      break;
    case "SET_ALL_CURRENCY":
      newState.allCurrency = action.value;
      break;
    case "SET_SELECTED_CURRENCY":
      newState.selectedCurrency = action.value;
      break;
    case "SET_BASKET":
      return {
        ...state,
        basket: state.basket.concat(action.value),
      };
    case "SET_QTY":
      return {
        ...state,
        qty: action.value,
      };
    case "UPDATE_PRODUCT_QTY_IN_BASKET":
      return {
        ...state,
        basket: state.basket.map((item, index) =>
          index === action.index ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case "SET_PRODUCT_INFO":
      newState.productInfo = action.value;
      break;
    case "SET_PRODUCT_COPY":
      newState.productCopy = action.value;
      break;
    case "RESET_PROD_INFO":
      const copy = structuredClone(state.productCopy);
      return {
        ...state,
        productInfo: copy,
      };
    case "SET_NEW_BASKET":
      return {
        ...state,
        basket: action.value,
      };

    default:
      return state;
  }
  return newState;
};

export default reducer;
