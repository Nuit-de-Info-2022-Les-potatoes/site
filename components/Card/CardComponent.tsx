import style from "../../styles/card/cardComponents.module.scss";
import cardBack from "../../public/card/card_back.png";
import Image from "next/image"

export default function CardComponent() {
    return <>
        <div className={style.card}>
            <Image src={cardBack} alt={"Image d'un virus"}/>
        </div>
    </>
}
