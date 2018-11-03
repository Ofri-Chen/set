import { Injectable } from '@angular/core';
import { Card } from '../../models/card';

@Injectable()
export class CardImageResolverService {

	constructor() { }

	public getImageUrl(card: Card): string {
		return `assets/cards/${card.color}/${card.filling}/${card.type}/${card.amount}.PNG`;
	}
}
