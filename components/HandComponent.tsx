import style from "../styles/HandComponent.module.scss";
import CardComponent from "./Card/CardComponent";
export default function HandComponent() {
    return <>

        <div className={style.deck}>

            { [1,2,3].map(() => {
                return <CardComponent/>
            }) }

            <div className={style.points}>
                <span>250</span>
                <p>Rapports</p>
            </div>

            { [1,2,3].map(() => {
                return <CardComponent/>
            }) }

        </div>

    </>
}
