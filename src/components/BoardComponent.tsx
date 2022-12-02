import HandComponent from "./HandComponent";
import style from "../../styles/BoardComponent.module.scss"
import {useAppDispatch, useAppSelector} from "../store/hook";
import {Player} from "../Models/Player";
import {BonusCard, Card, CardFamily, JokerCard, MalusCard, ScoreCard} from "../Models/Card";
import CardComponent from "./Card/CardComponent";
import {dropCard, pickCard, useCard} from "../store/gamestore";
import {useState} from "react";

export default function BoardComponent() {


    const [lock, setLock] = useState<boolean>(false)

    const playerAHand = useAppSelector(state => state.game.playerA.hand)
    const playerBHand = useAppSelector(state => state.game.playerB.hand)

    const scorePlayerA = useAppSelector(state => state.game.playerA.score)
    const scorePlayerB = useAppSelector(state => state.game.playerB.score)


    const topCardPlayerA = useAppSelector(state => state.game.playerA.topCard)
    const topCardPlayerB = useAppSelector(state => state.game.playerB.topCard)

    const jokerPlayerA = useAppSelector(state => state.game.playerA.jokers)
    const jokerPlayerB = useAppSelector(state => state.game.playerB.jokers)

    const dispatcher = useAppDispatch()

    const selectCard = (player: Player, card: Card): boolean => {
        {
            if (player == Player.playerA && lock) {
                return false;
            }
        }


        const topCard = player == Player.playerA ? topCardPlayerA : topCardPlayerB
        const otherTopCard = player != Player.playerA ? topCardPlayerA : topCardPlayerB
        const jokers = player == Player.playerA ? jokerPlayerA : jokerPlayerB


        console.log(topCardPlayerA, topCardPlayerB)
        if (topCard == undefined) {
            if (card instanceof JokerCard) {
                return false;
            }
            if (card instanceof MalusCard && otherTopCard == undefined) {
                return false
            }
            if (card instanceof ScoreCard) {
                return false;
            }
            if (card instanceof BonusCard && card.family != CardFamily.preservatif) {
                return false;
            }
        } else if (card instanceof BonusCard) {
            if (!(topCard instanceof MalusCard && topCard.family === card.family)) {
                return false
            }
        } else if (card instanceof MalusCard) {
            if (otherTopCard == undefined) {
                return false;
            }
        } else if (card instanceof ScoreCard) {
            if (topCard instanceof MalusCard) {
                if (jokers.filter(x => x.family === topCard.family).length == 0) {
                    return false
                }
            }

        }
        dispatcher(useCard({player, card}))

        dispatcher(pickCard({player}))
        if (player == Player.playerA) {
            setLock(true)

            playOtherPlayer()
            setLock(false)

        }

        return true;
    }
    const onDropCard = (player: Player, card: Card) => {

        {
            if (player == Player.playerA && lock)
                return false;
        }

        dispatcher(dropCard({player, card}))
        dispatcher(pickCard({player}))

        if (player == Player.playerA) {
            setLock(true)
            playOtherPlayer()
            setLock(false)

        }
    }

    const playOtherPlayer = () => {
        for (let i = 0; i < playerBHand.length; i++) {
            if (selectCard(Player.playerB, playerBHand[i])) {

                console.log("Player B", playerBHand[i].name)
                return
            }
        }
        console.log("Aucune Card -- Drop")
        onDropCard(Player.playerB, playerBHand[0])
    }

    return <>

        <div className={style.board}>

            <div className={"playerB"}>
                <div className={style.hands} style={{background: "#59B6AB"}}>

                    <div className={style.joker}>
                        {jokerPlayerB.map((card: Card) => {
                            return <CardComponent showDelete={false} card={card} back={false}/>
                        })}
                    </div>

                    <HandComponent cards={playerBHand} score={scorePlayerB} player={Player.playerB}
                                   onSelectCard={x => selectCard(Player.playerB, x)}
                                   onDropCard={x => onDropCard(Player.playerB, x)}/>
                </div>

                {topCardPlayerB ? <CardComponent showDelete={false} card={topCardPlayerB} back={false}/> : <></>}
            </div>

            <div className={"playerA"}>
                {topCardPlayerA ? <CardComponent showDelete={false} card={topCardPlayerA} back={false}/> : <></>}
                <div className={style.hands} style={{background: '#9B59B6'}}>

                    <div className={style.joker}>
                        {jokerPlayerA.map((card: Card) => {
                            return <CardComponent showDelete={false} card={card} back={false}/>
                        })}
                    </div>

                    <HandComponent cards={playerAHand} score={scorePlayerA} player={Player.playerA}
                                   onDropCard={x => onDropCard(Player.playerA, x)}
                                   onSelectCard={x => selectCard(Player.playerA, x)}/>
                </div>
            </div>
        </div>

    </>
}
