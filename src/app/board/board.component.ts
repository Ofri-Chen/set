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
	score: number = 0;
	isGameEnded: boolean;

	constructor(private cardsService: CardsService,
		private configService: ConfigService,
		private cardImageResolverService: CardImageResolverService,
		private setCheckingService: SetCheckingService) {
		this.gameConfig = configService.config.game;
	}

	ngOnInit() {
		this.deck = this.cardsService.generateDeck();
		this.boardCards = this.deck.splice(0, this.gameConfig.startingCards);
		this.manageSetsAvailability();
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

	}

	handleSetSelection() {
		this.setCheckingService.isSet(this.selectedCards)
			? this.handleSuccessfulSet()
			: this.handleUnsuccessfulSet();
	}

	handleSuccessfulSet() {
		if (this.deck.length) {
			this.selectedCards.forEach(setCard => {
				let newCard: Card = this.deck.splice(0, 1)[0];
				this.swapCardOnBoard(setCard, newCard);
			})

			this.score++;
			this.manageSetsAvailability();
			this.selectedCards = [];
		}
	}

	handleUnsuccessfulSet() {
		this.selectedCards.forEach(card => card.isSelected = false);
		this.selectedCards = [];
	}

	swapCardOnBoard(oldCard: Card, newCard: Card) {
		let index = this.boardCards.findIndex(card => card === oldCard);
		this.boardCards.splice(index, 1, newCard);
	}

	manageSetsAvailability() {
		let availableSets = this.setCheckingService.getAvailableSets(this.boardCards, this.gameConfig.cardsPerSet);
		while (!availableSets.length) {
			if (this.deck.length) {
				let cardsToAdd = this.deck.splice(0, this.gameConfig.cardsPerSet);
				this.boardCards = this.boardCards.concat(cardsToAdd);
				availableSets = this.setCheckingService.getAvailableSets(this.boardCards, this.gameConfig.cardsPerSet);
			}
			else {
				this.isGameEnded = true;
				alert(`game ended, sets: ${this.score}`);
				break;
			}
		}
	}

	checkSets() {
		console.log(this.setCheckingService.getAvailableSets(this.boardCards, this.gameConfig.cardsPerSet));
	}
}
