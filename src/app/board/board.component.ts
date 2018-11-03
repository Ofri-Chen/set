import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
	cards: Card[] = [];

	constructor() { }

	ngOnInit() {
		
	}

}
