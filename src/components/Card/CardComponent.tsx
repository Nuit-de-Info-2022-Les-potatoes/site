import style from "../../../styles/card/cardComponents.module.scss";
import cardBack from "../../../public/card/card_back.png";
import {BonusCard, Card, JokerCard, MalusCard, ScoreCard} from "../../Models/Card";
import trashIcon from '../../../public/card/trash.svg'

interface CardComponentProps {
    card: Card,
    back: boolean,
    onSelectCard?: (card: Card) => void
    onDropCard?: (card: Card) => void
    showDelete: boolean
}

export default function CardComponent({card, back, onSelectCard, onDropCard, showDelete=false}: CardComponentProps): JSX.Element {

    function getCardColor(card: Card): string {
        if (card instanceof MalusCard) {
            return '#D35400';
        } else if (card instanceof BonusCard) {
            return '#039800';
        } else if (card instanceof JokerCard) {
            return '#F96C06';
        } else if (card instanceof ScoreCard) {
            return 'black'
        }

        return '';
    }

    return <>
        <div className={style.flex}>
            <div className={style.card + " " + (back && style.back)} onClick={() => {
                if (onSelectCard !== undefined)
                    onSelectCard(card)
            }}>

                {back ? <img src={cardBack} alt={"Image d'un virus"}/> : <>
                    <div className={style.rounded}>
                        <div className={style.cardTitle}>{card.name}</div>

                        <div style={{background: getCardColor(card)}}>
                            <img src={'/card/' + card.image} alt={"Image d'un virus"}/>
                        </div>

                    </div>
                </>}

                {!back ?
                    <>
                        <div className={style.information}>
                            <a href={""}>?</a>
                        </div>
                    </> : <></>}
            </div>
            {(!back && showDelete) ?
            <div onClick={(e) => {
                if (onDropCard)
                    onDropCard(card)
            }} className={style.delete}>
                <img src={trashIcon} alt={""}/>
            </div>:<></>
            }
        </div>
    </>
}
