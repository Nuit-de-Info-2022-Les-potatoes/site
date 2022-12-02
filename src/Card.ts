export enum CardFamily {
    situation,
    syphilis,
    hpv,
    hepatiteB,
    preservatif,
    score
}

export interface Card {
    name: string,
    image: string,
    family : CardFamily

    // execute(player: Player): Promise<boolean>;
}

export class MalusCard implements Card {
    constructor(image: string, name: string,family : CardFamily) {
        this.image = image;
        this.name = name;
        this.family = family;
    }

    image: string;
    name: string;
    family : CardFamily;

    // async execute(player: Player): Promise<boolean> {
    //     const topCard = useAppSelector(state => player == Player.playerA ? state.game.playerA.topCard : state.game.playerB.topCard)
    //     if (!(topCard instanceof BonusCard))
    //         return false;
    //     const dispatcher = useAppDispatch()
    //
    //     dispatcher(useCard({player: player, card: this}))
    //
    //     return true;
    // }
}


export class BonusCard implements Card {

    constructor(image: string, name: string,family : CardFamily) {
        this.image = image;
        this.name = name;
        this.family = family;
    }

    image: string;
    name: string;
    family : CardFamily;

    // async execute(player: Player): Promise<boolean> {
    //     const topCard = useAppSelector(state => player == Player.playerA ? state.game.playerA.topCard : state.game.playerB.topCard)
    //
    //     if (!(topCard instanceof MalusCard))
    //         return false;
    //
    //
    //     const dispatcher = useAppDispatch()
    //
    //     dispatcher(useCard({player: player, card: this}))
    //
    //
    //     return true;
    // }

}

export class JokerCard implements Card {

    constructor(image: string, name: string,family : CardFamily) {
        this.image = image;
        this.name = name;
        this.family = family;
    }

    image: string;
    name: string;
    family : CardFamily;

    // async execute(player: Player): Promise<boolean> {
    //
    //     const dispatcher = useAppDispatch()
    //
    //     dispatcher(useCard({player: player, card: this}))
    //
    //
    //     return true;
    // }

}

export class ScoreCard implements Card {

    constructor(image: string, name: string, score: number,family : CardFamily) {
        this.image = image;
        this.name = name;
        this.score = score;
        this.family = family;
    }

    image: string;
    score: number;
    name: string;
    family : CardFamily;

    // async execute(player: Player): Promise<boolean> {
    //
    //     const dispatcher = useAppDispatch()
    //
    //     dispatcher(useCard({player: player, card: this}))
    //
    //     return true;
    // }

}

