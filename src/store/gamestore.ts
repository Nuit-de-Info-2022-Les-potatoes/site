import {Card} from "../Card";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./index";

export interface PlayerState {
    score: number,
    topCard: Card | undefined,
    jockers: Card[]
}

export interface GameStore {
    playerA: PlayerState,
    playerB: PlayerState
    deck: Card[]
}

const initialState : GameStore = {
    playerA : {
        score: 0,
        topCard : undefined,
        jockers : []
    },
    playerB: {
        score: 0,
        topCard : undefined,
        jockers : []
    },
    deck : []
}

export const gameSlice = createSlice({
    name: "GameState",
    initialState,
    reducers:{

    }
})


export const {  } = gameSlice.actions

export default gameSlice.reducer

