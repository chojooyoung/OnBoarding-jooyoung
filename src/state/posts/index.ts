import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostBody {
  title: string;
  body: string;
}

export interface PostsState {
  data: Post[];
  loading: boolean;
  error: null;
}

export interface ParamType {
  post: string;
}

interface idParam {
  id: number;
}

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    loading: true,
    error: null,
  } as PostsState,
  reducers: {
    getDataSuccess: (state, action: PayloadAction<Post[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    getDataFailure: (state, { payload: error }) => {
      state.loading = true;
      state.error = error;
    },
    getData: (state, action: PayloadAction<ParamType>) => {
      state.loading = true;
    },
    getDataByIdSuccess: (state, action: PayloadAction<Post>) => {
      const index = state.data.findIndex(
        (post) => post.id === action.payload.id,
      );
      if (index === -1) {
        state.data.push(action.payload);
      } else {
        state.data[index] = action.payload;
      }
      state.loading = false;
    },
    getDataById: (state, action: PayloadAction<idParam>) => {
      state.loading = true;
    },
    createPostSuccess: (state, action: PayloadAction<Post>) => {
      state.data.push(action.payload);
      state.loading = false;
    },
    createPost: (state, action: PayloadAction<PostBody>) => {
      state.loading = true;
    },

    deletePostById: (state, action: PayloadAction<idParam>) => {
      state.loading = true;
    },
    deleteSucess: (state, action: PayloadAction<idParam>) => {
      state.loading = false;
      const { id } = action.payload;
      const index = state.data.findIndex((post) => post.id === id);
      if (index !== -1) state.data.splice(index, 1);
    },
    modifyPost: (state, action: PayloadAction<Post>) => {
      state.loading = true;
    },
    modifyPostSucess: (state, action: PayloadAction<Post>) => {
      state.loading = false;
      const { id } = action.payload;
      const index = state.data.findIndex((post) => post.id === id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
  extraReducers: {},
});
export const posts = postsSlice.name;
export const postsReducer = postsSlice.reducer;
export const postsAction = postsSlice.actions;
