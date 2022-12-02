import style from "../../styles/card/cardComponents.module.scss";
import cardBack from "../../public/card/card_back.png";
import Image from "next/image"
import {Card} from "../../src/Card";


interface CardComponentProps {
    card:Card,
    back : boolean
}

export default function CardComponent({card,  back}: CardComponentProps) : JSX.Element {
    return <>
        <div className={style.card}>

            {back ? <Image src={cardBack} alt={"Image d'un virus"}/> : <>
                <div>{card.name}</div>

                <Image src={require('../../public/card/'+card.image)} alt={"Image d'un virus"}/>

                <div className={style.information}>
                    <a href={""}>?</a>
                </div>
            </> }


        </div>
    </>
}
