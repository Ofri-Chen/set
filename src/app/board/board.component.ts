import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { CardsService } from '../services/cards.service';
import { ConfigService } from '../services/config.service';
import { IGameConfig } from '../../models/IConfig';
import { CardImageResolverService } from '../services/card-image-resolver.service';
import { SetCheckingService } from '../services/set-checking.service';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
	gameConfig: IGameConfig;
	deck: Card[] = [];
	boardCards: Card[] = [];
	selectedCards: Card[] = [];


	constructor(private cardsService: CardsService,
		private configService: ConfigService,
		private cardImageResolverService: CardImageResolverService,
		private setCheckingService: SetCheckingService) {
		this.gameConfig = configService.config.game;
	}

	ngOnInit() {
		this.deck = this.cardsService.generateDeck();
		this.boardCards = this.deck.splice(0, this.gameConfig.startingCards);
	}

	getCardImageUrl(card: Card) {
		return this.cardImageResolverService.getImageUrl(card);
	}

	handleCardClick(card: Card) {
		card.isSelected = !card.isSelected;

		if (card.isSelected) {
			this.selectedCards.push(card);
			if (this.selectedCards.length == this.gameConfig.cardsPerSet) {
				this.handleSetSelection();
			}
		}
		else {
			this.selectedCards = this.selectedCards
				.filter(selectedCard => selectedCard !== card);
		}

		console.log(this.selectedCards.length);
	}

	handleSetSelection() {
		this.setCheckingService.isSet(this.selectedCards)
			? this.handleSuccessfulSet()
			: this.handleUnsuccessfulSet();
	}

	handleSuccessfulSet() {
		alert("success");
		if (this.deck.length) {
			this.selectedCards.forEach(setCard => {
				let newCard: Card = this.deck.splice(0, 1)[0];
				this.swapCardOnBoard(setCard, newCard);
			})

			this.selectedCards = [];
		}
	}

	handleUnsuccessfulSet() {
		alert("fail");
		this.selectedCards.forEach(card => card.isSelected = false);
		this.selectedCards = [];
	}

	swapCardOnBoard(oldCard: Card, newCard: Card) {
		let index = this.boardCards.findIndex(card => card === oldCard);
		this.boardCards.splice(index, 1, newCard);
	}
}
