export interface IConfig {
    cards: ICardsConfig;
    game: IGameConfig;
}

export interface ICardsConfig {
    colors: string[];
    filling: string[];
    types: string[];
    amounts: number[];
}

export interface IGameConfig {
    startingCards: number;
    cardsToAddOnDemand: number;
    cardsPerSet: number;
}