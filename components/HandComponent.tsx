import style from "../styles/HandComponent.module.scss";
import CardComponent from "./Card/CardComponent";
import {Card} from "../src/Card";
import {Player} from "../src/Player";

interface HandComponentProps {
    cards: Card[],
    color: string,
    player: Player
}

export default function HandComponent({cards, color, player}: HandComponentProps): JSX.Element {

    return <>

        <div className={style.deck} style={{'background': color}}>


            <div className={style.points}>
                <span>250</span>
                <p>Rapports</p>
            </div>

            {cards.map((x, index) => {
                return <CardComponent key={index} card={x} back={player == Player.playerB}/>
            })}


        </div>

    </>
}
