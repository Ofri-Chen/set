import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
	highScoreKey = 'highScore';
	constructor() { }

	public setHighScore(seconds: number) {
		if (seconds) {
			localStorage.setItem(this.highScoreKey, seconds.toString());
		}
	}

	public getHighScore(): number {
		return Number(localStorage.getItem(this.highScoreKey));
	}
}