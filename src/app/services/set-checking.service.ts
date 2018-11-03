import { Injectable } from '@angular/core';
import { Card } from '../../models/card';

@Injectable()
export class SetCheckingService {

	constructor() { }

	public isSet(cards: Card[]) {
		let properties = ['color', 'filling', 'type', 'amount'];
		return properties.every(prop => this.isPropertySet(cards, prop));		
	}


	private isPropertySet(cards: Card[], prop: string) {
		return this.isSamePropertyValue(cards, prop) || this.isDifferrentPropertyValue(cards, prop);
	}

	private isSamePropertyValue(cards: Card[], prop: string){
		let propValue = cards[0][prop];
		return cards.every(card => card[prop] === propValue);
	}

	private isDifferrentPropertyValue(cards: Card[], prop: string) {
		let propsValues: any[] = cards.map(card => card[prop]);
		let propsValuesSet: Set<any> = new Set(propsValues);

		return propsValues.length == propsValuesSet.size;
	}
}
