import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";