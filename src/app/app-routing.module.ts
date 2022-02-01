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
import { ChapterStudyComponent } from './Components/chapters/chapter-study/chapter-study.component';
import { CreateExplainComponent } from './Components/Explains/create-explain/create-explain.component';
import { ExplainOverviewComponent } from './Components/Explains/explain-overview/explain-overview.component';
import { EditExplainComponent } from './Components/Explains/edit-explain/edit-explain.component';
import { StudyExplainComponent } from './Components/Explains/study-explain/study-explain.component';
import { EditDeckComponent } from './Components/Decks/edit-deck/edit-deck.component';
import { ChapterContentPlaygroundComponent } from './Components/chapters/playground/chapter-content-playground/chapter-content-playground.component';
import { LogInComponent } from './Components/Profile/log-in/log-in.component';
import { AuthGuardService } from './Services/AuthGuard.service';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'myDecks', component:MyDecksComponent},
  {path: 'myRoots', component:MyRootsComponent, canActivate: [AuthGuardService]},
  {path: 'createRoot', component:CreateRootComponent},
  {path: 'rootOverview/:id', component:RootOverviewComponent},
  {path: 'createChapter/:id', component:CreateChapterComponent},
  {path: 'chapterOverview/:id', component:ChapterOverviewComponent},
  {path: 'chapterStudy/:id', component:ChapterStudyComponent},
  {path: 'chapterPlayground/:id', component:ChapterContentPlaygroundComponent},
  {path: 'createDeck', component:CreateDeckComponent},
  {path: 'editDeck/:id', component:EditDeckComponent},
  {path: 'createExplain/:id', component:CreateExplainComponent},
  {path: 'createDeck/:id', component:CreateDeckComponent},
  {path: 'deckOverview', component:DeckOverviewComponent},
  {path: 'deckOverview/:id', component:DeckOverviewComponent},
  {path: 'explainOverview/:id', component:ExplainOverviewComponent},
  {path: 'editExplain/:id', component:EditExplainComponent},
  {path: 'deckOverview/createCard/:deckId', component:CreateCardComponent},
  {path: 'deckOverview/viewCards/:deckId', component:ViewCardsComponent},
  {path: 'cardOverview/:id', component:CardOverviewComponent},
  {path: 'editCard/:cardId', component:EditCardComponent},
  {path: 'deck/study/:deckId', component:StudyComponent},
  {path: 'studyExplain/:id', component:StudyExplainComponent},
  {path: 'login', component:LogInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
