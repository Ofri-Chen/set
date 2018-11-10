import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	isGameBeingPlayed: boolean = false;
	previousGameTime: number;
	highScore: number;
	constructor(private localStorageService: LocalStorageService) { }

	ngOnInit() {
		this.highScore = this.localStorageService.getHighScore();
	}

	startGame() {
		this.isGameBeingPlayed = true;
	}

	gameEnded(gameTime: number) {
		this.previousGameTime = gameTime;
		this.isGameBeingPlayed = false;
		this.manageHighScore();
	}

	manageHighScore() {
		let currentHighScore = this.localStorageService.getHighScore();
		if (!currentHighScore || currentHighScore > this.previousGameTime) {
			this.localStorageService.setHighScore(this.previousGameTime);
			this.highScore = this.previousGameTime;
		}
	}
}