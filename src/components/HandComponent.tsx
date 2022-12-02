import style from "../../styles/HandComponent.module.scss";
import CardComponent from "./Card/CardComponent";
import {Card} from "../Models/Card";
import {Player} from "../Models/Player";

interface HandComponentProps {
    cards: Card[],
    player: Player,
    score : number,
    onSelectCard: (card:Card) => void,
    onDropCard?: (card: Card) => void
}

export default function HandComponent({cards, player, score,onSelectCard, onDropCard}: HandComponentProps): JSX.Element {

    return <>

        <div className={style.deck}>


            <div className={style.points}>
                <span>{score}</span>
                <p>Rapports</p>
            </div>

            {cards.map((x, index) => {
                return <CardComponent showDelete={true} key={index} card={x} back={player == Player.playerB&&false} onSelectCard={onSelectCard} onDropCard={onDropCard} />
            })}


        </div>

    </>
}
