import style from "../../../styles/card/cardComponents.module.scss";
import cardBack from "../../../public/card/card_back.png";
import {Card} from "../../Models/Card";


interface CardComponentProps {
    card: Card,
    back: boolean
}

export default function CardComponent({card, back}: CardComponentProps): JSX.Element {
    return <>
        <div className={style.card}>

            {back ? <img src={cardBack} alt={"Image d'un virus"}/> : <>
                <div>{card.name}</div>

                <img src={'/public/card/' + card.image} alt={"Image d'un virus"}/>

                <div className={style.information}>
                    <a href={""}>?</a>
                </div>
            </>}


        </div>
    </>
}
