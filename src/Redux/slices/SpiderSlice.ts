import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

type initVars = {
    Spiders: { id: string }[];
};

const initialState: initVars = {
    Spiders: [{ id: "init-spider" }],
};

export const Slice = createSlice({
    name: "Spider",
    initialState,
    reducers: {
        addSpider: (state, action: PayloadAction<number>) => {
            if (state.Spiders.length < 20) {
                for (let i = 0; i < (action.payload ?? 1); i++) {
                    state.Spiders.push({ id: nanoid() });
                }
            }
        },
        removeSpider: (state, action: PayloadAction<string>) => {
            state.Spiders = state.Spiders.filter(
                (spider) => spider.id !== action.payload
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const SpiderActions = Slice.actions;

export default Slice.reducer;
