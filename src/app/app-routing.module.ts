import { LoginComponent } from 'src/app/features/Profile/login/login.component';
import { DeckOverviewComponent } from './features/nodes/feature/deck-overview/deck-overview.component';
import { AddNodeComponent } from './features/nodes/feature/add-node/add-node.component';
import { AddRootComponent } from './features/roots/feature/add-root/add-root.component';
import { AddChapterComponent } from './features/chapters/feature/add-chapter/add-chapter.component';
import { ShowCardsComponent } from './features/cards/feature/show-cards/show-cards.component';
import { ShowNodesComponent } from './features/nodes/feature/show-nodes/show-nodes.component';
import { ShowNodesRichComponent } from './features/nodes/feature/show-nodes-rich/show-nodes-rich.component';
import { AddCardComponent } from './features/cards/feature/add-card/add-card.component';
import { MyContentComponent } from './features/my-content/feature/my-content/my-content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/feature/home/home.component';
import { ExplainOverviewComponent } from './features/nodes/feature/explain-overview/explain-overview.component';
import { LogInComponent } from './features/Profile/log-in/log-in.component';
import { AuthGuardService } from './features/shared/utils/AuthGuard.service';
import { ShowChaptersComponent } from './features/chapters/feature/show-chapters/show-chapters.component';
import { ShowRootsComponent } from './features/roots/feature/show-roots/show-roots.component';
import { StudyNodeComponent } from './features/study/feature/study-node/study-node.component';
import { ExploreComponent } from './features/explore/feature/explore/explore.component';
import { ExploreRootOverviewComponent } from './features/explore/feature/explore-root-overview/explore-root-overview.component';
import { StudyCardsComponent } from './features/study/feature/study-cards/study-cards.component';
import { Home2Component } from './features/home/feature/home2/home2.component';
import { RootOverviewComponent } from './features/roots/feature/root-overview/root-overview.component';
import { ChapterOverviewComponent } from './features/chapters/feature/chapter-overview/chapter-overview.component';

const routes: Routes = [
  {path: '', component:Home2Component},
  {path: 'home', component:Home2Component},
  {path: 'explore', component:ExploreComponent},
  {path: 'login', component:LoginComponent},
  {path: 'exploreRoot/:rootId', component:ExploreRootOverviewComponent},
  {path: 'myContent', component:MyContentComponent, canActivate: [AuthGuardService], children:[
    {path: 'Roots', component:ShowRootsComponent},
    {path: 'Roots/AddRoot', component:AddRootComponent},
    // {path:'Roots/:rootId/Introduction', component: RootOverviewComponent},
    {path:'Roots/:rootId/Chapters', component: ShowChaptersComponent},
    {path:'Roots/:rootId/Overview', component: RootOverviewComponent},
    {path:'Roots/:rootId/Chapters/AddChapter', component: AddChapterComponent},
    {path:'Roots/:rootId/Chapters/:chapterId/Overview', component: ChapterOverviewComponent},
    {path:'Roots/:rootId/Chapters/:chapterId/Nodes', component: ShowNodesRichComponent},
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
  {path: 'login', component:LogInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
