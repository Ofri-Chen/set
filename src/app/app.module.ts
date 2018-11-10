import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 


import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { CardsService } from './services/cards.service';
import { loadConfig, ConfigService } from './services/config.service';
import { HttpClient } from '@angular/common/http';
import { CardImageResolverService } from './services/card-image-resolver.service';
import { SetCheckingService } from './services/set-checking.service';
import { GameComponent } from './components/game/game.component';
import { TimePipe } from './pipes/time.pipe';
import { LocalStorageService } from './services/local-storage.service';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    TimePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CardsService,
    CardImageResolverService,
    SetCheckingService,
    ConfigService,
    LocalStorageService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true
    },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
