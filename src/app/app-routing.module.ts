import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardOverviewComponent } from './Components/card-overview/card-overview.component';
import { CreateCardComponent } from './Components/create-card/create-card.component';
import { CreateDeckComponent } from './Components/create-deck/create-deck.component';
import { DeckOverviewComponent } from './Components/deck-overview/deck-overview.component';
import { EditCardComponent } from './Components/edit-card/edit-card.component';
import { HomeComponent } from './Components/home/home.component';
import { MyDecksComponent } from './Components/my-decks/my-decks.component';
import { StudyComponent } from './Components/study/study.component';
import { ViewCardsComponent } from './Components/view-cards/view-cards.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'myDecks', component:MyDecksComponent},
  {path: 'createDeck', component:CreateDeckComponent},
  {path: 'deckOverview', component:DeckOverviewComponent},
  {path: 'deckOverview/:id', component:DeckOverviewComponent},
  {path: 'deckOverview/createCard/:deckId', component:CreateCardComponent},
  {path: 'deckOverview/viewCards/:deckId', component:ViewCardsComponent},
  {path: 'cardOverview/:id', component:CardOverviewComponent},
  {path: 'editCard/:cardId', component:EditCardComponent},
  {path: 'deck/study/:deckId', component:StudyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
