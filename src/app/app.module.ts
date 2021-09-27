import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { QuillModule } from 'ngx-quill'
import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { DeckListOverviewComponent } from './Components/deck-list-overview/deck-list-overview.component';
import { CreateDeckComponent } from './Components/create-deck/create-deck.component';
import { HeaderComponent } from './Components/header/header.component';
import { DeckOverviewComponent } from './Components/deck-overview/deck-overview.component';
import { CreateCardComponent } from './Components/create-card/create-card.component';
import { ViewCardsComponent } from './Components/view-cards/view-cards.component';
import { CardListOverviewComponent } from './Components/card-list-overview/card-list-overview.component';
import { CardOverviewComponent } from './Components/card-overview/card-overview.component';
import { EditCardComponent } from './Components/edit-card/edit-card.component';
import { StudyComponent } from './Components/study/study.component';
import { MyDecksComponent } from './Components/my-decks/my-decks.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeckListOverviewComponent,
    CreateDeckComponent,
    HeaderComponent,
    DeckOverviewComponent,
    CreateCardComponent,
    ViewCardsComponent,
    CardListOverviewComponent,
    CardOverviewComponent,
    EditCardComponent,
    StudyComponent,
    MyDecksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
