import {useAppSelector} from "../store/hook";
import {BonusCard, Card, CardFamily, JokerCard, MalusCard, ScoreCard} from "../Card";
import {GameStore, PlayerState} from "../store/gamestore";

//const gameState = useAppSelector(state => state.game)

/*
export function playerPossibleActions(gameState: GameStore): Card[] {
    //Retourne les actions possible du joueur en fonction de l'état du jeu et de la main du joueur
    let res = []
    return res
}
 */

export function aiPossibleActions(gameState : GameStore): Card[] {
    //Retourne les actions possible de l'ia (sachant qu'il peut jouer n'importe quel carte (si cohérent de jouer)

    //Ajoute les jokers encore dans le deck, donc non joués !!
    let res = []
    for(let i = 0; i < gameState.deck.length; i++) {
        if (gameState.deck[i] instanceof JokerCard)
            res.push(gameState.deck[i])
    }

    //Si l'ia peut avoir un rapport
    let canHaveSex = gameState.playerB.topCard instanceof ScoreCard
    canHaveSex = canHaveSex || (gameState.playerB.topCard != undefined &&
            gameState.playerB.topCard.family == CardFamily.preservatif &&
            gameState.playerB.topCard instanceof BonusCard)
    if(canHaveSex) {
        res.push(new ScoreCard("", "", 25,  CardFamily.score))
        res.push(new ScoreCard("", "", 50,  CardFamily.score))
        res.push(new ScoreCard("", "", 75,  CardFamily.score))
        res.push(new ScoreCard("", "", 100,  CardFamily.score))
        res.push(new ScoreCard("", "", 200,  CardFamily.score))
    }

    //Si le joueur peut avoir un rapport sexuel
    canHaveSex = gameState.playerA.topCard instanceof ScoreCard
    canHaveSex = canHaveSex || (gameState.playerA.topCard != undefined &&
        gameState.playerA.topCard.family == CardFamily.preservatif &&
        gameState.playerA.topCard instanceof BonusCard)
    if(canHaveSex) {
        res.push(new MalusCard("", "", CardFamily.hepatiteB))
        res.push(new MalusCard("", "", CardFamily.hpv))
        res.push(new MalusCard("", "", CardFamily.situation))
        res.push(new MalusCard("", "", CardFamily.syphilis))
        res.push(new MalusCard("", "", CardFamily.preservatif))
    }
    return res;
}


export function evaluation(gameState:GameStore): number {
    //Evalue l'état du jeu
    return agentEvaluation(gameState.playerA) - agentEvaluation(gameState.playerB);
}

export function agentEvaluation(player: PlayerState): number {
    //Calcule le score du joueur pour ensuite calculer celui de la partie !
    let res = 0
    if (player.topCard != undefined) {
        switch (player.topCard.family) {
            case CardFamily.preservatif:
                if (player.topCard instanceof ScoreCard)
                    res += 1;
                if (player.topCard instanceof BonusCard)
                    res += 1;
                if (player.topCard instanceof MalusCard)
                    res -= 1;
                break;
            case CardFamily.hpv:
            case CardFamily.hepatiteB:
            case CardFamily.syphilis:
                if (player.topCard instanceof BonusCard)
                    res += 2;
                if (player.topCard instanceof MalusCard)
                    res -= 2;
                if (player.topCard instanceof JokerCard)
                    res += 4;
                break;
            case CardFamily.situation:
                if (player.topCard instanceof BonusCard)
                    res += 0.5;
                if (player.topCard instanceof MalusCard)
                    res -= 0.5;
                if (player.topCard instanceof JokerCard)
                    res += 2;
                break;
        }
    }
    res += player.score / 100;
    return res;
}


