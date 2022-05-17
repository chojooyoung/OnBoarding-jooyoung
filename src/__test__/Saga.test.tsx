import * as matchers from "redux-saga-test-plan/matchers";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import * as Saga from "../state/saga";
import rootReducer from "../state/rootReducer";
import { postsAction } from "../state/posts";
import Api from "../api";

describe("getPostDataSaga", () => {
  const param = { payload: { post: "post" } };
  const MockPostResponse = [{ id: 1, title: "test", body: "test" }];
  const { getDataSuccess, getDataFailure } = postsAction;

  it("getDataSaga 정상 진행", async () => {
    await expectSaga(Saga.getDataSaga, param)
      .withReducer(rootReducer)
      // API Mocking response 제공
      .provide([[matchers.call.fn(Api.getPostList), MockPostResponse]])
      // put으로 actions 실행
      .put(getDataSuccess(MockPostResponse))
      // state 에 정상 반영 되는가?
      .hasFinalState({
        postsReducer: { data: MockPostResponse, loading: false, error: null },
      })
      .run();
  });

  it("getDataSaga 에러 반환", async () => {
    const error = new Error("모의 에러");

    await expectSaga(Saga.getDataSaga, param)
      .withReducer(rootReducer)
      .provide([[matchers.call.fn(Api.getPostList), throwError(error)]])
      .put(getDataFailure(error))
      .hasFinalState({
        postsReducer: { data: [], loading: true, error },
      })
      .run();
  });
});

describe("getDataByIdSaga", () => {
  const param = { payload: { id: 1 } };
  const MockPostResponse = { id: 1, title: "test", body: "test" };
  const { getDataByIdSuccess } = postsAction;

  it("getDataByIdSaga 정상 진행", async () => {
    await expectSaga(Saga.getDataByIdSaga, param)
      .withReducer(rootReducer)
      // API Mocking response 제공
      .provide([[matchers.call.fn(Api.getPostById), MockPostResponse]])
      // put으로 actions 실행
      .put(getDataByIdSuccess(MockPostResponse))
      // state 에 정상 반영 되는가?
      .hasFinalState({
        postsReducer: { data: [MockPostResponse], loading: false, error: null },
      })
      .run();
  });
});

describe("createPostSaga 정상 진행", () => {
  const param = { payload: { title: "test", body: "test" } };
  const MockPostResponse = { id: 1, title: "test", body: "test" };
  const { createPostSuccess } = postsAction;

  it("createPostSaga 정상 진행", async () => {
    await expectSaga(Saga.createPostSaga, param)
      .withReducer(rootReducer)
      // API Mocking response 제공
      .provide([[matchers.call.fn(Api.createPost), MockPostResponse]])
      // put으로 actions 실행
      .put(createPostSuccess(MockPostResponse))
      // state 에 정상 반영 되는가?
      .hasFinalState({
        postsReducer: { data: [MockPostResponse], loading: false, error: null },
      })
      .run();
  });
});

describe("deletDataSaga 정상 진행", () => {
  const createParam = { payload: { title: "test", body: "test" } };
  const createMockPostResponse = { id: 1, title: "test", body: "test" };
  const { createPostSuccess } = postsAction;
  const param = { payload: { id: 1 } };
  const MockPostResponse = { id: 1 };
  const { deleteSucess } = postsAction;

  it("deletDataSaga 정상 진행", async () => {
    await expectSaga(Saga.createPostSaga, createParam)
      .withReducer(rootReducer)
      // API Mocking response 제공
      .provide([[matchers.call.fn(Api.createPost), createMockPostResponse]])
      // put으로 actions 실행
      .put(createPostSuccess(createMockPostResponse))
      // state 에 정상 반영 되는가?
      .hasFinalState({
        postsReducer: {
          data: [createMockPostResponse],
          loading: false,
          error: null,
        },
      })
      .run();
    // 하나 만들고 실행
    await expectSaga(Saga.deletDataSaga, param)
      .withReducer(rootReducer)
      // API Mocking response 제공
      .provide([[matchers.call.fn(Api.deletePost), MockPostResponse]])
      // put으로 actions 실행
      .put(deleteSucess(MockPostResponse))
      // state 에 정상 반영 되는가?
      .hasFinalState({
        postsReducer: { data: [], loading: false, error: null },
      })
      .run();
  });
});

describe("modifyDataSaga 정상 진행", () => {
  const createParam = { payload: { title: "test", body: "test" } };
  const createMockPostResponse = { id: 1, title: "test", body: "test" };
  const { createPostSuccess, modifyPostSucess } = postsAction;
  const param = { payload: { id: 1, title: "testModify", body: "testModify" } };
  const MockPostResponse = { id: 1, title: "testModify", body: "testModify" };

  it("modifyDataSaga 정상 진행", async () => {
    await expectSaga(Saga.createPostSaga, createParam)
      .withReducer(rootReducer)
      // API Mocking response 제공
      .provide([[matchers.call.fn(Api.createPost), createMockPostResponse]])
      // put으로 actions 실행
      .put(createPostSuccess(createMockPostResponse))
      // state 에 정상 반영 되는가?
      .hasFinalState({
        postsReducer: {
          data: [createMockPostResponse],
          loading: false,
          error: null,
        },
      })
      .run();
    // 하나 만들고 실행
    await expectSaga(Saga.modifyDataSaga, param)
      .withReducer(rootReducer)
      // API Mocking response 제공
      .provide([[matchers.call.fn(Api.modyfyPost), MockPostResponse]])
      // put으로 actions 실행
      .put(modifyPostSucess(MockPostResponse))
      // state 에 정상 반영 되는가?
      .hasFinalState({
        postsReducer: {
          data: [],
          loading: false,
          error: null,
        },
      })
      .run();
  });
});
