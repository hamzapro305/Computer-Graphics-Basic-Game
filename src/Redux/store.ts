import { configureStore } from "@reduxjs/toolkit";
import GhostSlice from "./slices/GhostSlice";
import SpiderSlice from "./slices/SpiderSlice";

export const store = configureStore({
    reducer: {
        Ghost: GhostSlice,
        Spider: SpiderSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
