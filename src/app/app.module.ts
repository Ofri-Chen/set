import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardsService } from './services/cards.service';
import { loadConfig, ConfigService } from './services/config.service';
import { HttpClient } from '@angular/common/http';
import { CardImageResolverService } from './services/card-image-resolver.service';




@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CardsService,
    CardImageResolverService,
    ConfigService,
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
