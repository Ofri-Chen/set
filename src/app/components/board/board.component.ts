import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Card } from '../../../models/card';
import { CardsService } from '../../services/cards.service';
import { ConfigService } from '../../services/config.service';
import { IGameConfig } from '../../../models/IConfig';
import { CardImageResolverService } from '../../services/card-image-resolver.service';
import { SetCheckingService } from '../../services/set-checking.service';

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
	seconds: number = 0;

	@Output('gameEnded') gameEndedEventEmitter = new EventEmitter();

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
		setInterval(() => this.seconds += 1, 1000);

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

		this.selectedCards = [];
	}

	handleSuccessfulSet() {
		this.score++;
		this.clearAllHighlights();
		
		if (!this.deck.length) {
			this.endGame();
		}
		
		if (this.boardCards.length == this.gameConfig.startingCards) {
			this.selectedCards.forEach(setCard => {
				let newCard: Card = this.deck.splice(0, 1)[0];
				this.swapCardOnBoard(setCard, newCard);
			});
		}

		else {
			this.selectedCards.forEach(setCard => {
				let index = this.boardCards.findIndex(card => card === setCard);
				this.boardCards.splice(index, 1);
			});
		}

		this.manageSetsAvailability();
		this.selectedCards = [];
	}

	clearAllHighlights() {
		this.boardCards.forEach(card => card.isHighlighted = false);
	}

	handleUnsuccessfulSet() {
		this.selectedCards.forEach(card => card.isSelected = false);
	}

	swapCardOnBoard(oldCard: Card, newCard: Card) {
		let index = this.boardCards.findIndex(card => card === oldCard);
		this.boardCards.splice(index, 1, newCard);
	}

	showSet() {
		let availableSet = this.setCheckingService.getAvailableSets(this.boardCards, this.gameConfig.cardsPerSet)[0];
		availableSet.forEach(card => {
			card.isSelected = false;
			card.isHighlighted = true;
		});
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
				this.endGame();
				break;
			}
		}
	}

	endGame() {
		this.gameEndedEventEmitter.emit();
	}

	checkSets() {
		console.log(this.setCheckingService.getAvailableSets(this.boardCards, this.gameConfig.cardsPerSet));
	}
}
