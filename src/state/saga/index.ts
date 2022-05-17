import { call, put, takeEvery } from "@redux-saga/core/effects";
import API from "../../api";
import { postsAction } from "../posts";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostBody {
  title: string;
  body: string;
}

interface ParamType {
  post: string;
}

interface idParam {
  id: number;
}

// get Saga
export function* getDataSaga(action: { payload: ParamType }) {
  const { getDataSuccess, getDataFailure } = postsAction;
  const param = action.payload;
  try {
    const response: Post[] = yield call(API.getPostList, param);
    // call은 미들웨어에게 함수와 인자들을 실행하라는 명령
    yield put(getDataSuccess(response));
    // put은 dispatch 를 뜻한다.
  } catch (err) {
    yield put(getDataFailure(err));
  }
}

export function* getDataByIdSaga(action: { payload: idParam }) {
  const { getDataByIdSuccess, getDataFailure } = postsAction;
  const param = action.payload;
  try {
    const response: Post = yield call(API.getPostById, param);
    // call은 미들웨어에게 함수와 인자들을 실행하라는 명령
    yield put(getDataByIdSuccess(response));
    // put은 dispatch 를 뜻한다.
  } catch (err) {
    yield put(getDataFailure(err));
  }
}
export function* createPostSaga(action: { payload: PostBody }) {
  const { createPostSuccess, getDataFailure } = postsAction;
  const body = action.payload;
  try {
    const response: Post = yield call(API.createPost, body);
    yield put(createPostSuccess(response));
    // eslint-disable-next-line no-restricted-globals
  } catch (err) {
    yield put(getDataFailure(err));
  }
}

export function* deletDataSaga(action: { payload: idParam }) {
  const { deleteSucess, getDataFailure } = postsAction;
  const param = action.payload;
  try {
    yield call(API.deletePost, param);
    yield put(deleteSucess(param));
  } catch (err) {
    yield put(getDataFailure(err));
  }
}

export function* modifyDataSaga(action: { payload: Post }) {
  const { modifyPostSucess, getDataFailure } = postsAction;
  const param = action.payload;
  try {
    yield call(API.modyfyPost, param);
    yield put(modifyPostSucess(param));
  } catch (err) {
    yield put(getDataFailure(err));
  }
}

// Main Saga
export function* postSaga() {
  const { getData, getDataById, deletePostById, createPost, modifyPost } =
    postsAction;
  yield takeEvery(getData, getDataSaga);
  yield takeEvery(getDataById, getDataByIdSaga);
  yield takeEvery(deletePostById, deletDataSaga);
  yield takeEvery(createPost, createPostSaga);
  yield takeEvery(modifyPost, modifyDataSaga);
}
