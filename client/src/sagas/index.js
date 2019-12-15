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
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.data),
    })
        .then(response => response.json());

    yield put({ type: "SIGNIN_RESPONSE", json: json || [{ error: json }] });
}

function* postPost(data) {
    const json = yield fetch('http://localhost:3001/comment/post', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.data),
    })
        .then(response => response.json());

    yield put({ type: "POST_POST_RESPONSE", json: json || [{ error: json }] });
}

function* getPosts(data) {
    const json = yield fetch('http://localhost:3001/comment/post', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json());

    yield put({ type: "GET_POSTS_RESPONSE", json: json || [{ error: json }] });
}

function* editPost(data) {
    const json = yield fetch('http://localhost:3001/comment/update', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.data),
    })
        .then(response => response.json());

    yield put({ type: "EDIT_POST_RESPONSE", json: json || [{ error: json }] });
}

function* postComment(data) {
    const json = yield fetch('http://localhost:3001/comment/comment', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.data),
    })
        .then(response => response.json());

    yield put({ type: "POST_COMMENT_RESPONSE", json: json || [{ error: json }] });
}

function* getComments(data) {
    const json = yield fetch('http://localhost:3001/comment/comment', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json());

    yield put({ type: "GET_COMMENTS_RESPONSE", json: json || [{ error: json }] });
}

function* editComment(data) {
    const json = yield fetch('http://localhost:3001/comment/update', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.data),
    })
        .then(response => response.json());

    yield put({ type: "EDIT_COMMENT_RESPONSE", json: json || [{ error: json }] });
}

function* actionWatcher() {
    yield takeLatest('REGISTER_USER_TRIGGER', registerUser);
    yield takeLatest('SIGNIN_TRIGGER', signinUser);
    yield takeLatest('POST_POST', postPost);
    yield takeLatest('GET_POSTS', getPosts);
    yield takeLatest('EDIT_POST_TRIGGER', editPost);
    yield takeLatest('POST_COMMENT', postComment);
    yield takeLatest('GET_COMMENTS', getComments);
    yield takeLatest('EDIT_COMMENT_TRIGGER', editComment);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
