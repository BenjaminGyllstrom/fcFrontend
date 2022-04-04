import { DeckOverviewComponent } from './Components/Actions/deck-overview/deck-overview.component';
import { AddNodeComponent } from './Components/Actions/add-node/add-node.component';
import { AddRootComponent } from './Components/Actions/add-root/add-root.component';
import { AddChapterComponent } from './Components/Actions/add-chapter/add-chapter.component';
import { ShowCardsComponent } from './Components/Actions/show-cards/show-cards.component';
import { ShowNodesComponent } from './Components/Actions/show-nodes/show-nodes.component';
import { AddCardComponent } from './Components/Actions/add-card/add-card.component';
import { MyContentComponent } from './Components/my-content/my-content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardOverviewComponent } from './Components/Cards/card-overview/card-overview.component';
import { ChapterOverviewComponent } from './Components/chapters/chapter-overview/chapter-overview.component';
import { CreateChapterComponent } from './Components/chapters/create-chapter/create-chapter.component';
import { CreateCardComponent } from './Components/Cards/create-card/create-card.component';
import { CreateDeckComponent } from './Components/Decks/create-deck/create-deck.component';
// import { DeckOverviewComponent } from './Components/Decks/deck-overview/deck-overview.component';
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
import { ExplainOverviewComponent } from './Components/Actions/explain-overview/explain-overview.component';
// import { ExplainOverviewComponent } from './Components/Explains/explain-overview/explain-overview.component';
import { EditExplainComponent } from './Components/Explains/edit-explain/edit-explain.component';
import { StudyExplainComponent } from './Components/Explains/study-explain/study-explain.component';
import { EditDeckComponent } from './Components/Decks/edit-deck/edit-deck.component';
import { ChapterContentPlaygroundComponent } from './Components/chapters/playground/chapter-content-playground/chapter-content-playground.component';
import { LogInComponent } from './Components/Profile/log-in/log-in.component';
import { AuthGuardService } from './Services/AuthGuard.service';
import { ShowChaptersComponent } from './Components/Actions/show-chapters/show-chapters.component';
import { ShowRootsComponent } from './Components/Actions/show-roots/show-roots.component';
import { StudyNodeComponent } from './Components/Actions/study-node/study-node.component';
import { ExploreComponent } from './Components/explore/explore.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'explore', component:ExploreComponent},
  {path: 'myDecks', component:MyDecksComponent, canActivate: [AuthGuardService]},
  {path: 'myRoots', component:MyRootsComponent, canActivate: [AuthGuardService]},
  {path: 'myContent', component:MyContentComponent, canActivate: [AuthGuardService], children:[
    {path: 'Roots', component:ShowRootsComponent},
    {path: 'Roots/AddRoot', component:AddRootComponent},
    // {path:'Roots/:rootId/Introduction', component: RootOverviewComponent},
    {path:'Roots/:rootId/Chapters', component: ShowChaptersComponent},
    {path:'Roots/:rootId/Chapters/AddChapter', component: AddChapterComponent},
    {path:'Roots/:rootId/Chapters/:chapterId/Nodes', component: ShowNodesComponent},
    {path:'Roots/:rootId/Chapters/:chapterId/Nodes/AddNode', component: AddNodeComponent},
    {path:'Roots/:rootId/Chapters/:chapterId/Nodes/Deck/:nodeId/Overview', component: DeckOverviewComponent},
    {path:'Roots/:rootId/Chapters/:chapterId/Nodes/Deck/:nodeId/Cards', component: ShowCardsComponent},
    {path:'Roots/:rootId/Chapters/:chapterId/Nodes/Deck/:nodeId/AddCard', component: AddCardComponent},
    {path:'Roots/:rootId/Chapters/:chapterId/Nodes/Explain/:nodeId/Overview', component: ExplainOverviewComponent},
    {path:'Roots/:rootId/Chapters/:chapterId/Nodes/:nodeType/:nodeId/Study', component: StudyNodeComponent},
  ]},
  {path: 'createRoot', component:CreateRootComponent, canActivate: [AuthGuardService]},
  {path: 'rootOverview/:id', component:RootOverviewComponent, canActivate: [AuthGuardService]},
  {path: 'createChapter/:id', component:CreateChapterComponent, canActivate: [AuthGuardService]},
  {path: 'chapterOverview/:id', component:ChapterOverviewComponent, canActivate: [AuthGuardService]},
  {path: 'chapterStudy/:id', component:ChapterStudyComponent, canActivate: [AuthGuardService]},
  {path: 'chapterPlayground/:id', component:ChapterContentPlaygroundComponent, canActivate: [AuthGuardService]},
  {path: 'createDeck', component:CreateDeckComponent, canActivate: [AuthGuardService]},
  {path: 'editDeck/:id', component:EditDeckComponent, canActivate: [AuthGuardService]},
  {path: 'createExplain/:id', component:CreateExplainComponent, canActivate: [AuthGuardService]},
  {path: 'createDeck/:id', component:CreateDeckComponent, canActivate: [AuthGuardService]},
  {path: 'deckOverview', component:DeckOverviewComponent, canActivate: [AuthGuardService]},
  {path: 'deckOverview/:id', component:DeckOverviewComponent, canActivate: [AuthGuardService]},
  {path: 'explainOverview/:id', component:ExplainOverviewComponent, canActivate: [AuthGuardService]},
  {path: 'editExplain/:id', component:EditExplainComponent, canActivate: [AuthGuardService]},
  {path: 'deckOverview/createCard/:deckId', component:CreateCardComponent, canActivate: [AuthGuardService]},
  {path: 'deckOverview/viewCards/:deckId', component:ViewCardsComponent, canActivate: [AuthGuardService]},
  {path: 'cardOverview/:id', component:CardOverviewComponent, canActivate: [AuthGuardService]},
  {path: 'editCard/:cardId', component:EditCardComponent, canActivate: [AuthGuardService]},
  {path: 'study/:type/:id', component:StudyComponent, canActivate: [AuthGuardService]},
  {path: 'studyExplain/:id', component:StudyExplainComponent, canActivate: [AuthGuardService]},
  {path: 'login', component:LogInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
