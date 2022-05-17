import { store } from "../state";
import { postsAction } from "../state/posts";

describe("Store", () => {
  it("설계한대로 state가 나오는가?", () => {
    const state = store.getState();
    const expectedData = {
      postsReducer: {
        data: [],
        loading: true,
        error: null,
      },
    };

    expect(state).toEqual(expectedData);
  });

  //   it("dispatch시 state의 로딩,데이터등 상태변경이 잘 되는가?", () => {
  //     const state = store.getState();

  //     const data = [
  //       { id: 1, title: "test", body: "test" },
  //       { id: 2, title: "test2", body: "test2" },
  //     ];
  //     const expectedAction = [
  //       { body: "test", id: 1, title: "test" },
  //       { body: "test2", id: 2, title: "test2" },
  //     ];
  //     store.dispatch(postsAction.getDataSuccess(data));

  //     expect(store.getState().postsReducer.loading).toEqual(false);
  //     expect(store.getState().postsReducer.data).toEqual(expectedAction);
  //   });

  //   it("getDataFailure dispatch시 로딩,에러 상태변경이 잘 되는가?", () => {
  //     const error = new Error("모의 에러");

  //     const data = error;

  //     store.dispatch(postsAction.getDataFailure(data));

  //     expect(store.getState().postsReducer.loading).toEqual(true);
  //     expect(store.getState().postsReducer.error).toEqual(error);
  //   });

  //   it("getDataByIdSuccess dispatch시 로딩,에러 상태변경이 잘 되는가?", () => {
  //     const data = { id: 1, title: "test", body: "test" };
  //     const expectedAction = [{ id: 1, title: "test", body: "test" }];
  //     store.dispatch(postsAction.getDataByIdSuccess(data));

  //     expect(store.getState().postsReducer.data).toEqual(expectedAction);
  //     expect(store.getState().postsReducer.loading).toEqual(false);
  //   });

  //   it("getDataById dispatch시 로딩 상태변경이 잘 되는가?", () => {
  //     const data = { id: 1 };
  //     const expectedAction = {
  //       payload: { id: 1 },
  //     };
  //     store.dispatch(postsAction.getDataById(data));

  //     expect(store.getState().postsReducer.loading).toEqual(true);
  //   });

  //   it("createPostSuccess dispatch시 로딩 상태변경이 잘 되는가?", () => {
  //     const data = { id: 1, title: "test", body: "test" };
  //     const expectedAction = [{ id: 1, title: "test", body: "test" }];

  //     store.dispatch(postsAction.createPostSuccess(data));

  //     expect(store.getState().postsReducer.data).toEqual(expectedAction);
  //   });

  //   it("createPost dispatch시 상태변경이 잘 되는가?", () => {
  //     const data = { title: "test", body: "test" };
  //     const expectedAction = { title: "test", body: "test" };

  //     store.dispatch(postsAction.createPost(data));

  //     expect(store.getState().postsReducer.loading).toEqual(true);
  //   });

  //   it("deletePostById dispatch시 로딩 상태변경이 잘 되는가?", () => {
  //     const data = { id: 1 };
  //     store.dispatch(postsAction.deletePostById(data));

  //     expect(store.getState().postsReducer.loading).toEqual(true);
  //   });

  //   it("deleteSucess dispatch시 상태변경이 잘 되는가?", () => {
  //     const createData = { id: 1, title: "test", body: "test" };
  //     const data = { id: 1 };
  //     const expectedAction: any[] = [];

  //     store.dispatch(postsAction.createPostSuccess(createData));

  //     store.dispatch(postsAction.deleteSucess(data));

  //     expect(store.getState().postsReducer.data).toEqual(expectedAction);

  //     expect(store.getState().postsReducer.loading).toEqual(false);
  //   });

  //   it("modifyPost dispatch시 로딩 상태변경이 잘 되는가?", () => {
  //     const data = { id: 1, title: "test", body: "test" };

  //     store.dispatch(postsAction.modifyPost(data));

  //     expect(store.getState().postsReducer.loading).toEqual(true);
  //   });

  //   it("modifyPostSucess dispatch시 상태변경이 잘 되는가?", () => {
  //     const data = { id: 1, title: "test", body: "test" };
  //     const expectedAction = [{ id: 1, title: "test", body: "test" }];

  //     store.dispatch(postsAction.createPostSuccess(data));

  //     expect(store.getState().postsReducer.data).toEqual(expectedAction);

  //     store.dispatch(postsAction.modifyPostSucess(data));

  //     expect(store.getState().postsReducer.loading).toEqual(false);

  //     expect(store.getState().postsReducer.data).toEqual(expectedAction);
  //   });
});
