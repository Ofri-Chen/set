import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { CardsService } from '../services/cards.service';
import { ConfigService } from '../services/config.service';
import { IGameConfig } from '../../models/IConfig';
import { CardImageResolverService } from '../services/card-image-resolver.service';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
	gameConfig: IGameConfig;
	deck: Card[] = [];
	currentlyPlayedCards: Card[] = [];
	currentlySelectedCards: Card[] = [];


	constructor(private cardsService: CardsService,
		private configService: ConfigService,
		private cardImageResolverService: CardImageResolverService) {
		this.gameConfig = configService.config.game;
	}

	ngOnInit() {
		this.deck = this.cardsService.generateDeck();
		this.currentlyPlayedCards = this.deck.splice(0, this.gameConfig.startingCards);
	}

	getCardImageUrl(card: Card) {
		return this.cardImageResolverService.getImageUrl(card);
	}

	handleCardClick(card: Card) {
		card.isSelected = !card.isSelected;

		if (card.isSelected) {
			this.currentlySelectedCards.push(card);
			if (this.currentlySelectedCards.length == this.gameConfig.cardsPerSet) {
				this.handleSetSelection();
			}
		}
		else {
			this.currentlySelectedCards = this.currentlySelectedCards
				.filter(selectedCard => selectedCard !== card);
		}

		console.log(this.currentlySelectedCards.length);
	}

	handleSetSelection() {

	}
}
