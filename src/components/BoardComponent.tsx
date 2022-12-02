import HandComponent from "./HandComponent";
import style from "../../styles/BoardComponent.module.scss"
import {useAppSelector} from "../store/hook";
import {Player} from "../Models/Player";

export default function BoardComponent() {


    const playerAHand = useAppSelector(state => state.game.playerA.hand)
    const playerBHand = useAppSelector(state => state.game.playerB.hand)

    return <>

        <div className={style.board}>

                <HandComponent cards={playerBHand} color={"#59B6AB"} player={Player.playerB}/>
                <HandComponent cards={playerAHand} color={"#9B59B6"} player={Player.playerA}/>

        </div>

    </>
}
