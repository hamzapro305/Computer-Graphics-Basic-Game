import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

type initVars = {
    Ghosts: { id: string; status: "BASIC" | "RED" }[];
    killed: number;
};

const initialState: initVars = {
    Ghosts: [{ id: "init-ghost", status: "BASIC" }],
    killed: 0,
};

export const Slice = createSlice({
    name: "Ghost",
    initialState,
    reducers: {
        addGhost: (state) => {
            if (state.Ghosts.length < 30) {
                state.Ghosts.push({ id: nanoid(), status: "BASIC" });
            }
        },
        updateGhost: (state, action: PayloadAction<initVars["Ghosts"][0]>) => {
            const _ghost = action.payload;
            state.Ghosts.forEach((ghost) => {
                if (ghost.id === _ghost.id) ghost.status = _ghost.status;
            });
        },
        removeGhost: (state, action: PayloadAction<string>) => {
            state.Ghosts = state.Ghosts.filter(
                (ghost) => ghost.id !== action.payload
            );
            state.killed += 1;
        },
    },
});

// Action creators are generated for each case reducer function
export const GhostActions = Slice.actions;

export default Slice.reducer;
