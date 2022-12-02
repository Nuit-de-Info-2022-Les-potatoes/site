import {BonusCard, Card, CardFamily, JokerCard, MalusCard, ScoreCard} from "../Card";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Player} from "../Player";

export interface PlayerState {
    score: number,
    topCard: Card | undefined,
    jokers: JokerCard[],
    hand: Card[]
}

export interface GameStore {
    playerA: PlayerState,
    playerB: PlayerState
    deck: Card[]
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
    let cards: Card[] = []
/*    for (let i = 0; i < 5; i++) {
        cards.push(new MalusCard("malus_preservatif.png", "Préservatif défectueux", CardFamily.preservatif))
    }
    for (let i = 0; i < 14; i++) {
        cards.push(new BonusCard("bonus_preservatif.png", "Préservatif", CardFamily.preservatif))
    }*/
    for (let i = 0; i < 6; i++) {
        cards.push(new BonusCard("user.png", "Vivre Seul", CardFamily.situation))
        cards.push(new BonusCard("pills.png", "Traitement anti-biotique", CardFamily.syphilis))
        cards.push(new BonusCard("pills.png", "Traitement par cryothérapie", CardFamily.hpv))
        cards.push(new BonusCard("star-of-life.png", "Guérison Spontanée", CardFamily.hepatiteB))
    }
    for (let i = 0; i < 4; i++) {
        cards.push(new MalusCard("users.png", "Vivre en collectivité", CardFamily.situation))
    }
    //malus
    for (let i = 0; i < 3; i++) {
        //malus_syphilis
        cards.push(new MalusCard("virus.png", "Syphilis", CardFamily.syphilis))
        cards.push(new MalusCard("virus.png", "HPV", CardFamily.hpv))
        cards.push(new MalusCard("virus.png", "Hepatite D", CardFamily.hepatiteB))
    }


    cards.push(new MalusCard("joker_situation.png", "Vivre en  couple", CardFamily.situation))
    cards.push(new MalusCard("joker_syphilis.png", "Recherche", CardFamily.syphilis))
    cards.push(new MalusCard("syringe.png", "Vaccin HPV", CardFamily.hpv))
    cards.push(new MalusCard("syringe.png", "Vaccin Hepatite B", CardFamily.hepatiteB))

    for (let i = 0; i < 10; i++) {
        cards.push(new ScoreCard("score_25.png", "Score 25", 25, CardFamily.score))
        cards.push(new ScoreCard("score_50.png", "Score 50", 50, CardFamily.score))
        cards.push(new ScoreCard("score_75.png", "Score 75", 75, CardFamily.score))
    }
    for (let i = 0; i < 12; i++) {
        cards.push(new ScoreCard("score_100.png", "Score 100", 100, CardFamily.score))
    }

    for (let i = 0; i < 4; i++) {
        cards.push(new ScoreCard("score_200.png", "Score 200", 200, CardFamily.score))
    }

    return cards.sort((a, b) => 0.5 - Math.random());
}

const initCards = getInitCard()

const initialState: GameStore = {
    playerA: {
        score: 0,
        topCard: undefined,
        jokers: [],
        hand: initCards.slice(0, initNumberCard)
    },
    playerB: {
        score: 0,
        topCard: undefined,
        jokers: [],
        hand: initCards.slice(0, initNumberCard)
    },
    deck: initCards.slice(initNumberCard * 2, initCards.length)
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

            if (action.payload.card instanceof BonusCard) {

                state.deck.push(action.payload.card)
                state.deck = state.deck.sort((a, b) => 0.5 - Math.random()); // Shuffle

                if (action.payload.player == Player.playerA) {
                    state.playerA.hand = state.playerA.hand.filter(x => x != action.payload.card)
                    state.playerA.topCard = action.payload.card
                } else {
                    state.playerB.hand = state.playerB.hand.filter(x => x != action.payload.card)
                    state.playerB.topCard = action.payload.card
                }
            } else if (action.payload.card instanceof MalusCard) {

                state.deck.push(action.payload.card)
                state.deck = state.deck.sort((a, b) => 0.5 - Math.random()); // Shuffle

                if (action.payload.player == Player.playerA) {
                    state.playerA.hand = state.playerA.hand.filter(x => x != action.payload.card)
                    state.playerB.topCard = action.payload.card
                } else {
                    state.playerB.hand = state.playerB.hand.filter(x => x != action.payload.card)
                    state.playerA.topCard = action.payload.card
                }
            } else if (action.payload.card instanceof ScoreCard) {

                if (action.payload.player == Player.playerA) {
                    state.playerA.hand = state.playerA.hand.filter(x => x != action.payload.card)
                    state.playerA.score += action.payload.card.score
                } else {
                    state.playerB.hand = state.playerB.hand.filter(x => x != action.payload.card)
                    state.playerB.score += action.payload.card.score
                }

            } else if (action.payload.card instanceof JokerCard) {

                if (action.payload.player == Player.playerA) {
                    state.playerA.hand = state.playerA.hand.filter(x => x != action.payload.card)
                    state.playerA.jokers.push(action.payload.card)
                } else {
                    state.playerA.hand = state.playerA.hand.filter(x => x != action.payload.card)
                    state.playerB.jokers.push(action.payload.card)
                }

            }


        },
        reset: (state) => {
            state.playerA.score = 0
            state.playerB.score = 0
            state.playerA.jokers = []
            state.playerB.jokers = []
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

