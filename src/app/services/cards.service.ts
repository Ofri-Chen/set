import { Injectable } from '@angular/core';
import { Card } from '../../models/card';
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
		let config = this.configService.config;
		let cards: Card[] = [];

		config.colors.forEach(color => {
			config.types.forEach(type => {
				config.amounts.forEach(amount => {
					cards.push({
						color,
						type,
						amount
					})
				});
			});
		});

		return cards;
	}

	private shuffleDeck(cards: Card[]): Card[] {
		let amonutOfSwaps: number = cards.length * 5;

		for(let i = 0; i < amonutOfSwaps; i++) {
			let firstIndex = Math.floor(Math.random() * cards.length);
			let secondIndex = Math.floor(Math.random() * cards.length);
			console.log(firstIndex);

			let temp = cards[firstIndex];
			cards[firstIndex] = cards[secondIndex];
			cards[secondIndex] = temp;
		}

		return cards;
	}
}