import { configureStore } from "@reduxjs/toolkit";

import hotelReducer from "./slice/hotelsSlice";
import autoSuggestionReducer from "./slice/autoSuggestionSlice";

export const createStore = (preloadedState) => {
  if (preloadedState) {
    return configureStore({
      reducer: { hotelReducer, autoSuggestionReducer },
      preloadedState,
    });
  }
  return configureStore({
    reducer: { hotelReducer, autoSuggestionReducer },
  });
};
