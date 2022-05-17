import { postsAction } from "../state/posts";

describe("Actions", () => {
  it("getDataSuccess 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = [
      { id: 1, title: "test", body: "test" },
      { id: 2, title: "test2", body: "test2" },
    ];
    const expectedAction = {
      payload: [
        { id: 1, title: "test", body: "test" },
        { id: 2, title: "test2", body: "test2" },
      ],
      type: "posts/getDataSuccess",
    };

    expect(postsAction.getDataSuccess(data)).toEqual(expectedAction);
  });

  it("getData 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = { post: "1" };
    const expectedAction = {
      payload: { post: "1" },
      type: "posts/getData",
    };

    expect(postsAction.getData(data)).toEqual(expectedAction);
  });

  it("getDataFailure 액션 생성이 설계한대로 잘 되었는가?", () => {
    const error = new Error("모의 에러");

    const data = error;
    const expectedAction = {
      payload: error,
      type: "posts/getDataFailure",
    };

    expect(postsAction.getDataFailure(data)).toEqual(expectedAction);
  });

  it("getDataByIdSuccess 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = { id: 1, title: "test", body: "test" };
    const expectedAction = {
      payload: { id: 1, title: "test", body: "test" },

      type: "posts/getDataByIdSuccess",
    };
    expect(postsAction.getDataByIdSuccess(data)).toEqual(expectedAction);
  });

  it("getDataById 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = { id: 1 };
    const expectedAction = {
      payload: { id: 1 },
      type: "posts/getDataById",
    };
    expect(postsAction.getDataById(data)).toEqual(expectedAction);
  });

  it("createPostSuccess 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = { id: 1, title: "test", body: "test" };
    const expectedAction = {
      payload: { id: 1, title: "test", body: "test" },

      type: "posts/createPostSuccess",
    };
    expect(postsAction.createPostSuccess(data)).toEqual(expectedAction);
  });

  it("createPost 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = { title: "test", body: "test" };
    const expectedAction = {
      payload: { title: "test", body: "test" },

      type: "posts/createPost",
    };
    expect(postsAction.createPost(data)).toEqual(expectedAction);
  });

  it("deletePostById 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = { id: 1 };
    const expectedAction = {
      payload: { id: 1 },
      type: "posts/deletePostById",
    };
    expect(postsAction.deletePostById(data)).toEqual(expectedAction);
  });

  it("deleteSucess 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = { id: 1 };
    const expectedAction = {
      payload: { id: 1 },
      type: "posts/deleteSucess",
    };
    expect(postsAction.deleteSucess(data)).toEqual(expectedAction);
  });

  it("modifyPost 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = { id: 1, title: "test", body: "test" };
    const expectedAction = {
      payload: { id: 1, title: "test", body: "test" },

      type: "posts/modifyPost",
    };
    expect(postsAction.modifyPost(data)).toEqual(expectedAction);
  });

  it("modifyPostSucess 액션 생성이 설계한대로 잘 되었는가?", () => {
    const data = { id: 1, title: "test", body: "test" };
    const expectedAction = {
      payload: { id: 1, title: "test", body: "test" },

      type: "posts/modifyPostSucess",
    };
    expect(postsAction.modifyPostSucess(data)).toEqual(expectedAction);
  });
});
