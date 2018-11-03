import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { CardsService } from '../services/cards.service';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
	deck: Card[] = [];

	constructor(private cardsService: CardsService) { }

	ngOnInit() {
		this.deck = this.cardsService.generateDeck();
	}
}
