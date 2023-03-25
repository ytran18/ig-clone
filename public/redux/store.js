import { applyMiddleware, createStore, combineReducers } from "redux";
import { userReducer, postReducer } from "./reducer"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    userReducer: userReducer,
    postReducer: postReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, applyMiddleware(thunk))

export const persistor = persistStore(store)