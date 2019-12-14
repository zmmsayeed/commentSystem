import { put, takeLatest, all } from 'redux-saga/effects'

function* registerUser(data) {
    const json = yield fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.data),
    })
        .then(response => response.json());

    yield put({ type: "REGISTER_USER_RESPONSE", json: json || [{ error: json }] });
}





function* actionWatcher() {
    yield takeLatest('REGISTER_USER_TRIGGER', registerUser);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
