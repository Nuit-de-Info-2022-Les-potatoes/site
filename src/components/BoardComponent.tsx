import HandComponent from "./HandComponent";
import style from "../../styles/BoardComponent.module.scss"
import {useAppSelector} from "../store/hook";
import {Player} from "../Models/Player";
import {Card} from "../Models/Card";

export default function BoardComponent() {


    const playerAHand = useAppSelector(state => state.game.playerA.hand)
    const playerBHand = useAppSelector(state => state.game.playerB.hand)

    const scorePlayerA = useAppSelector(state => state.game.playerA.score)
    const scorePlayerB = useAppSelector(state => state.game.playerB.score)




    const selectCard = ( player:Player, card:Card)=>{

    }

    return <>

        <div className={style.board}>

                <HandComponent cards={playerBHand} color={"#59B6AB"} score={scorePlayerB} player={Player.playerB} onSelectCard={x=>selectCard(Player.playerB, x)}/>
                <HandComponent cards={playerAHand} color={"#9B59B6"} score={scorePlayerA} player={Player.playerA} onSelectCard={x=>selectCard(Player.playerA, x)}/>

        </div>

    </>
}
