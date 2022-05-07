import { configureStore } from "@redux/toolkit";

export const store = configureStore({});

export type RootState = ReturnType<typeof store.getState>;
