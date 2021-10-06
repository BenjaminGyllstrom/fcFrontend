import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardOverviewComponent } from './Components/Cards/card-overview/card-overview.component';
import { ChapterOverviewComponent } from './Components/chapters/chapter-overview/chapter-overview.component';
import { CreateChapterComponent } from './Components/chapters/create-chapter/create-chapter.component';
import { CreateCardComponent } from './Components/Cards/create-card/create-card.component';
import { CreateDeckComponent } from './Components/Decks/create-deck/create-deck.component';
import { DeckOverviewComponent } from './Components/Decks/deck-overview/deck-overview.component';
import { EditCardComponent } from './Components/Cards/edit-card/edit-card.component';
import { HomeComponent } from './Components/home/home.component';
import { MyDecksComponent } from './Components/Decks/my-decks/my-decks.component';
import { CreateRootComponent } from './Components/roots/create-root/create-root.component';
import { MyRootsComponent } from './Components/roots/my-roots/my-roots.component';
import { RootOverviewComponent } from './Components/roots/root-overview/root-overview.component';
import { StudyComponent } from './Components/study/study.component';
import { ViewCardsComponent } from './Components/Cards/view-cards/view-cards.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'myDecks', component:MyDecksComponent},
  {path: 'myRoots', component:MyRootsComponent},
  {path: 'createRoot', component:CreateRootComponent},
  {path: 'rootOverview/:id', component:RootOverviewComponent},
  {path: 'createChapter/:id', component:CreateChapterComponent},
  {path: 'chapterOverview/:id', component:ChapterOverviewComponent},
  {path: 'createDeck', component:CreateDeckComponent},
  {path: 'createDeck/:id', component:CreateDeckComponent},
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
