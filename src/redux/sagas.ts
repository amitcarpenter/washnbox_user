import {put,all,takeEvery,call} from "redux-saga/effects"
import {fetchDataFailure,fetchDataRequest,fetchDataSuccess} from "./dataSlice"


function fetchDataFromApi(){
    return new Promise((resolve) =>
        setTimeout(() => resolve({ message: "Hello from Saga!" }), 1000)
    );
}

function* fetchDataSaga(){
    try {
       const data  = yield call(fetchDataFromApi)
       yield put(fetchDataSuccess(data));
    } catch (error) {
        yield put(fetchDataFailure(error?.message));
    }
}


function* watchFetchData(){
    yield(takeEvery("data/fetchDataRequest",fetchDataSaga))
}

export default function* rootSaga(){
    yield all([])
}