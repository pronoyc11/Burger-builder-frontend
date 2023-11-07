import { createStore,applyMiddleware } from "redux";
import {Reducer} from "./Reducer.js";
import thunk from "redux-thunk";


export const Store = createStore(Reducer,applyMiddleware(thunk));