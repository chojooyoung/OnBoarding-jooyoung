import { call, put, takeEvery } from "@redux-saga/core/effects";
import axios, { AxiosRequestConfig } from "axios";
import { postsAction } from "../posts";

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface ParamType {
  post: string;
}

interface idParam {
  id: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface emptyParam {}

async function getPostList(param: ParamType) {
  const response = await axios.get(`http://localhost:3001/${param.post}`);
  const resData = response.data;
  return resData;
}

async function getPostById(param: idParam) {
  const response = await axios.get(`http://localhost:3001/post/${param.id}`);
  const resData = response.data;
  return resData;
}

async function deletePost(param: idParam) {
  const response = await axios.delete(`http://localhost:3001/post/${param.id}`);
  const resData = response;
  return resData;
}

// get Saga
export function* getDataSaga(action: { payload: ParamType }) {
  const { getDataSuccess, getDataFailure } = postsAction;
  const param = action.payload;
  try {
    const response: Post[] = yield call(getPostList, param);
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
    const response: Post = yield call(getPostById, param);
    // call은 미들웨어에게 함수와 인자들을 실행하라는 명령
    yield put(getDataByIdSuccess(response));
    // put은 dispatch 를 뜻한다.
  } catch (err) {
    yield put(getDataFailure(err));
  }
}

export function* deletDataSaga(action: { payload: idParam }) {
  const { deleteSucess, getDataFailure } = postsAction;
  const param = action.payload;
  try {
    yield call(deletePost, param);
    yield put(deleteSucess(param));
  } catch (err) {
    yield put(getDataFailure(err));
  }
}

// Main Saga
export function* postSaga() {
  const { getData, getDataById, deletePostById } = postsAction;
  yield takeEvery(getData, getDataSaga);
  yield takeEvery(getDataById, getDataByIdSaga);
  yield takeEvery(deletePostById, deletDataSaga);
}