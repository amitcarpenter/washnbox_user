import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
// import Reducers from "./dataSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./rootReducers";
import Reducers from "./dataSlice"

const sageMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer:Reducers,
    // middleware:(getDefaultMiddleware)=>(
    //     getDefaultMiddleware({thunk:false}).concat(sageMiddleware)
    // )
})

// sageMiddleware.run(rootSaga)

export default store;