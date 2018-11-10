import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
	highScoreKey = 'highScore';
	constructor() { }

	public setHighScore(seconds: number) {
		localStorage.setItem(this.highScoreKey, seconds.toString());
	}

	public getHighScore(): number {
		return Number(localStorage.getItem(this.highScoreKey));
	}
}