import style from "../../styles/HandComponent.module.scss";
import CardComponent from "./Card/CardComponent";
import {Card} from "../Models/Card";
import {Player} from "../Models/Player";

interface HandComponentProps {
    cards: Card[],
    color: string,
    player: Player,
    score : number,
    onSelectCard: (card:Card) => void,
}

export default function HandComponent({cards, color, player, score,onSelectCard}: HandComponentProps): JSX.Element {

    return <>

        <div className={style.deck} style={{'background': color}}>


            <div className={style.points}>
                <span>{score}</span>
                <p>Rapports</p>
            </div>

            {cards.map((x, index) => {
                return <CardComponent key={index} card={x} back={player == Player.playerB} onSelectCard={onSelectCard} />
            })}


        </div>

    </>
}
