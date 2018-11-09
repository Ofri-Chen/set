import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	isGameBeingPlayed: boolean = false;
	previousGameTime: number;
	constructor() { }

	ngOnInit() {
	}

	startGame() {
		this.isGameBeingPlayed = true;
	}

	gameEnded(gameTime) {
		this.isGameBeingPlayed = false;
	}
}