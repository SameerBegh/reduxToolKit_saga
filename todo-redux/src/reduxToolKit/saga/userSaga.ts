import { call, put, takeEvery } from "redux-saga/effects";
import { getUserFailure, getUserSuccess } from "../slices/userSlice";


function* getUserDetails(): Generator<any, any, any> {
    try {
        const response = yield call(() => fetch("https://jsonplaceholder.typicode.com/users"));
        const usersDetails = yield response.json();
        yield put(getUserSuccess(usersDetails));
    } catch (error: any) {
        yield put(getUserFailure())
        throw new Error(error);
    }
}
function* userSaga() {
    yield takeEvery("user/getUser", getUserDetails);
}

export default userSaga;