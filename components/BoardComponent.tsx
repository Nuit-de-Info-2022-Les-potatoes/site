import HandComponent from "./HandComponent";
import style from "../styles/BoardComponent.module.scss"
export default function BoardComponent() {
    return <>

        <div className={style.board}>
            <HandComponent/>

            <HandComponent/>
        </div>

    </>
}
