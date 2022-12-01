import {Card} from "../Card";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Player} from "../Player";

export interface PlayerState {
    score: number,
    topCard: Card | undefined,
    jockers: Card[],
    hand: Card[]
}

export interface GameStore {
    playerA: PlayerState,
    playerB: PlayerState
    deck: Card[]
}

const initialState: GameStore = {
    playerA: {
        score: 0,
        topCard: undefined,
        jockers: [],
        hand: []
    },
    playerB: {
        score: 0,
        topCard: undefined,
        jockers: [],
        hand: []
    },
    deck: []
}

interface AddScorePayloadAction {
    player: Player,
    score: number
}

interface UseCardPayloadAction {
    player: Player,
    card: Card
}

interface DropCardPayloadAction {
    player: Player,
    card: Card
}

interface PickCardPayloadAction {
    player: Player
}

const initNumberCard: number = 6

function getInitCard(): Card[] {
    return []
}

export const gameSlice = createSlice({
    name: "GameState",
    initialState,
    reducers: {
        addScore: (state, action: PayloadAction<AddScorePayloadAction>) => {
            if (action.payload.player == Player.playerA) {
                state.playerA.score += action.payload.score
            } else {
                state.playerB.score += action.payload.score
            }
        },
        useCard: (state, action: PayloadAction<UseCardPayloadAction>) => {
            //TODO Type de carte
            if (action.payload.player == Player.playerA) {
                state.playerA.topCard = action.payload.card
            } else {
                state.playerB.topCard = action.payload.card
            }
        },
        reset: (state) => {
            state.playerA.score = 0
            state.playerB.score = 0
            state.playerA.jockers = []
            state.playerB.jockers = []
            state.playerA.topCard = undefined
            state.playerB.topCard = undefined

            const initCards = getInitCard()

            state.playerA.hand = initCards.slice(0, initNumberCard);
            state.playerB.hand = initCards.slice(initNumberCard, initNumberCard * 2);
            state.deck = initCards.slice(initNumberCard * 2, initCards.length);
        },
        dropCard: (state, action: PayloadAction<DropCardPayloadAction>) => {
            // Remettre dans le deck
            state.deck.push(action.payload.card)
            state.deck = state.deck.sort((a, b) => 0.5 - Math.random()); // Shuffle

            if (action.payload.player == Player.playerA) {
                state.playerA.hand = state.playerA.hand.filter(x => x != action.payload.card)
            } else {
                state.playerB.hand = state.playerB.hand.filter(x => x != action.payload.card)
            }
        },
        pickCard: (state, action: PayloadAction<PickCardPayloadAction>) => {
            const firsCard = state.deck[0];
            state.deck = state.deck.filter(x => x != firsCard)

            if (action.payload.player == Player.playerA) {
                state.playerA.hand.push(firsCard)
            } else {
                state.playerB.hand.push(firsCard)
            }
        }
    }
})


export const {addScore, useCard, reset, dropCard, pickCard} = gameSlice.actions

export default gameSlice.reducer

