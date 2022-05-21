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
// import { DeckOverviewComponent } from './Components/Decks/deck-overview/deck-overview.component';
import { HomeComponent } from './Components/home/home.component';
// import { CreateRootComponent } from './Components/roots/create-root/create-root.component';
// import { MyRootsComponent } from './Components/roots/my-roots/my-roots.component';
// import { RootOverviewComponent } from './Components/roots/root-overview/root-overview.component';
import { StudyComponent } from './Components/study/study.component';
import { ExplainOverviewComponent } from './Components/Actions/explain-overview/explain-overview.component';
// import { ExplainOverviewComponent } from './Components/Explains/explain-overview/explain-overview.component';
import { LogInComponent } from './Components/Profile/log-in/log-in.component';
import { AuthGuardService } from './Services/AuthGuard.service';
import { ShowChaptersComponent } from './Components/Actions/show-chapters/show-chapters.component';
import { ShowRootsComponent } from './Components/Actions/show-roots/show-roots.component';
import { StudyNodeComponent } from './Components/Actions/study-node/study-node.component';
import { ExploreComponent } from './Components/explore/explore.component';
import { ExploreRootOverviewComponent } from './Components/explore-root-overview/explore-root-overview.component';
import { StudyCardsComponent } from './Components/Actions/study-node/study-cards/study-cards.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'explore', component:ExploreComponent},
  {path: 'exploreRoot/:rootId', component:ExploreRootOverviewComponent},
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
    // {path:'Roots/:rootId/Chapters/:chapterId/Nodes/:nodeType/:nodeId/Study', component: StudyCardsComponent},
    {path:'Roots/:rootId/Chapters/:chapterId/Nodes/:nodeType/:nodeId/Study', component: StudyNodeComponent},
  ]},
  {path: 'deckOverview', component:DeckOverviewComponent, canActivate: [AuthGuardService]},
  {path: 'deckOverview/:id', component:DeckOverviewComponent, canActivate: [AuthGuardService]},
  {path: 'explainOverview/:id', component:ExplainOverviewComponent, canActivate: [AuthGuardService]},
  {path: 'study/:type/:id', component:StudyComponent, canActivate: [AuthGuardService]},
  {path: 'login', component:LogInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
