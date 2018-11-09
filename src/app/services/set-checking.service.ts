import { Injectable } from '@angular/core';
import { Card } from '../../models/card';
import { ConfigService } from './config.service';

@Injectable()
export class SetCheckingService {
	count: number = 0;

	constructor(private configService: ConfigService) { }

	public isSet(cards: Card[]): boolean {
		let properties = ['color', 'filling', 'type', 'amount'];
		return properties.every(prop => this.isPropertySet(cards, prop));
	}

	counter = 0;

	public getAvailableSets(cards: Card[], amountOfCardsPerSet: number): Card[][] {
		return this.recursiveSetChecker(cards, [], amountOfCardsPerSet, 0);
	}

	public recursiveSetChecker(cards: Card[], currentCards: Card[],
		amountOfCardsPerSet: number, startingIndex: number): Card[][] {
		let availableSets = [];
		let numOfIterations = cards.length - amountOfCardsPerSet + currentCards.length + 1;
		for (let i = startingIndex; i < numOfIterations; i++) {
			currentCards.push(cards[i]);
			if (currentCards.length == amountOfCardsPerSet) {
				if (this.isSet(currentCards)) {
					availableSets = availableSets.concat(currentCards);
				}
			}
			else {
				let sets = this.recursiveSetChecker(cards, currentCards, amountOfCardsPerSet, i + 1);
				availableSets = availableSets.concat(sets);
			}

			currentCards.pop();
		}

		return availableSets;
	}

	private isPropertySet(cards: Card[], prop: string) {
		return this.isSamePropertyValue(cards, prop) || this.isDifferrentPropertyValue(cards, prop);
	}

	private isSamePropertyValue(cards: Card[], prop: string) {
		let propValue = cards[0][prop];
		return cards.every(card => card[prop] === propValue);
	}

	private isDifferrentPropertyValue(cards: Card[], prop: string) {
		let propsValues: any[] = cards.map(card => card[prop]);
		let propsValuesSet: Set<any> = new Set(propsValues);

		return propsValues.length == propsValuesSet.size;
	}
}