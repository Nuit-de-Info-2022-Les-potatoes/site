import {Card} from "../Card";
import {evaluation, aiPossibleActions} from "./eval";
import {useSelector} from "react-redux";
import {GameStore} from "../store/gamestore";
import {useAppSelector} from "../store/hook";

let state = useAppSelector(state => state.game)


export function minMax(): Card {
    //Non réaliser, dans l'idée pour le joueur du tour (à ajouter à l'état) la carte à jour pour déterminer
    //quel carte l'ia doit jouer. La profondeur est à déterminer (sert à régler la difficulté)
    let actions = aiPossibleActions(state)
    let score = evaluation(state)
    return actions[0]
}