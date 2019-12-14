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

function* signinUser(data) {
    const json = yield fetch('http://localhost:3001/user?email=' + data.data.email, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json());

    yield put({ type: "SIGNIN_RESPONSE", json: json || [{ error: json }] });
}



function* actionWatcher() {
    yield takeLatest('REGISTER_USER_TRIGGER', registerUser);
    yield takeLatest('SIGNIN_TRIGGER', signinUser);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
