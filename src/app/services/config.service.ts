import { Injectable } from '@angular/core';
import { IConfig } from '../../models/IConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigService {
	public config: IConfig;

	constructor(private http: HttpClient) { }

	public load(): Promise<any> {
		console.log('config service');
		let configObservable: Observable<any> = this.http.get(`assets/config/config.json`);
		configObservable.subscribe((config: IConfig) => {
			this.config = config;
		});

		return configObservable.toPromise();
	}
}

export function loadConfig(configService: ConfigService) {
	return () => configService.load();
}