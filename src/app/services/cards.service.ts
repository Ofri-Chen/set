import { Injectable } from '@angular/core';
import { Card } from '../../card';
import { ConfigService } from './config.service';


@Injectable()
export class CardsService {

	constructor(private configService: ConfigService) { }

	generateDeck(): Card[] {
		let orderedDeck: Card[] = this.generateOrderedDeck();
		let shuffledCards = this.shuffleDeck(orderedDeck);

		return shuffledCards;
	}

	private generateOrderedDeck(): Card[] {
		let cardsConfig = this.configService.config.cards;
		let cards: Card[] = [];

		cardsConfig.colors.forEach(color => {
			cardsConfig.filling.forEach(filling => {
				cardsConfig.types.forEach(type => {
					cardsConfig.amounts.forEach(amount => {
						cards.push({
							color,
							filling,
							type,
							amount,
							isSelected: false,
							isHighlighted: false
						})
					});
				});
			});
		});

		return cards;
	}

	private shuffleDeck(cards: Card[]): Card[] {
		let amonutOfSwaps: number = cards.length * 5;

		for (let i = 0; i < amonutOfSwaps; i++) {
			let firstIndex = Math.floor(Math.random() * cards.length);
			let secondIndex = Math.floor(Math.random() * cards.length);

			let temp = cards[firstIndex];
			cards[firstIndex] = cards[secondIndex];
			cards[secondIndex] = temp;
		}

		return cards;
	}
}