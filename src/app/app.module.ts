import { Action } from 'src/app/Services/sideBar.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { QuillModule } from 'ngx-quill'
import { QuillModule } from 'ngx-quill'

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
// import {  } from '@angular/material/';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { DeckListOverviewComponent } from './Components/Decks/deck-list-overview/deck-list-overview.component';
import { CreateDeckComponent } from './Components/Decks/create-deck/create-deck.component';
import { HeaderComponent } from './Components/header/header.component';
import { DeckOverviewComponent } from './Components/Decks/deck-overview/deck-overview.component';
import { CreateCardComponent } from './Components/Cards/create-card/create-card.component';
import { ViewCardsComponent } from './Components/Cards/view-cards/view-cards.component';
import { CardListOverviewComponent } from './Components/Cards/card-list-overview/card-list-overview.component';
import { CardOverviewComponent } from './Components/Cards/card-overview/card-overview.component';
import { EditCardComponent } from './Components/Cards/edit-card/edit-card.component';
import { StudyComponent } from './Components/study/study.component';
import { MyDecksComponent } from './Components/Decks/my-decks/my-decks.component';
import { RootListOverviewComponent } from './Components/roots/root-list-overview/root-list-overview.component';
import { MyRootsComponent } from './Components/roots/my-roots/my-roots.component';
import { CreateRootComponent } from './Components/roots/create-root/create-root.component';
import { RootOverviewComponent } from './Components/roots/root-overview/root-overview.component';
// import { ChapterListItemComponent } from './Components/chapters/chapter-list-item/chapter-list-item.component';
import { ChapterListItemComponent } from './Components/Actions/show-chapters/chapter-list-item/chapter-list-item.component';
import { ChapterOverviewComponent } from './Components/chapters/chapter-overview/chapter-overview.component';
import { CreateChapterComponent } from './Components/chapters/create-chapter/create-chapter.component';
import { ChapterStudyComponent } from './Components/chapters/chapter-study/chapter-study.component';
import { DeckNodeComponent } from './Components/Nodes/deck-node/deck-node.component';
import { ExplainNodeComponent } from './Components/Nodes/explain-node/explain-node.component';
import { ExplainListOverviewComponent } from './Components/Explains/explain-list-overview/explain-list-overview.component';
import { CreateExplainComponent } from './Components/Explains/create-explain/create-explain.component';
// import { ExplainOverviewComponent } from './Components/Explains/explain-overview/explain-overview.component';
import { ExplainOverviewComponent } from './Components/Actions/explain-overview/explain-overview.component';
import { EditExplainComponent } from './Components/Explains/edit-explain/edit-explain.component';
import { StudyExplainComponent } from './Components/Explains/study-explain/study-explain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EditDeckComponent } from './Components/Decks/edit-deck/edit-deck.component';
import { MainDisplayComponent } from './Components/MainDisplay/main-display/main-display.component';
import { MainDisplayHomeComponent } from './Components/MainDisplay/main-display-home/main-display-home.component';
import { MainDisplayRootsComponent } from './Components/MainDisplay/main-display-roots/main-display-roots.component';
import { MainDisplayChaptersComponent } from './Components/MainDisplay/main-display-chapters/main-display-chapters.component';
import { ChapterContentPlaygroundComponent } from './Components/chapters/playground/chapter-content-playground/chapter-content-playground.component';
import { PlaygroundTemplatesComponent } from './Components/chapters/playground/playground-templates/playground-templates.component';
import { PlaygroundNodesComponent } from './Components/chapters/playground/playground-nodes/playground-nodes.component';
import { PlaygroundNodeInfoComponent } from './Components/chapters/playground/playground-node-info/playground-node-info.component';
import { CreateDeckPlaygroundComponent } from './Components/Decks/create-deck-playground/create-deck-playground.component';
import { PlaygroundCreateComponent } from './Components/chapters/playground/playground-create/playground-create.component';
import { CreateCardPlaygroundComponent } from './Components/Cards/create-card-playground/create-card-playground.component';
import { CreateExplainPlaygroundComponent } from './Components/Explains/create-explain-playground/create-explain-playground.component';
import { EditDeckPlaygroundComponent } from './Components/Decks/edit-deck-playground/edit-deck-playground.component';
import { EditExplainPlaygroundComponent } from './Components/Explains/edit-explain-playground/edit-explain-playground.component';
import { LogInComponent } from './Components/Profile/log-in/log-in.component';
import { GoogleLoginProvider, SocialAuthService, SocialLoginModule } from 'angularx-social-login';
import {AuthGuardService} from './Services/AuthGuard.service';
import { ViewCardsPlaygroundComponent } from './Components/Cards/view-cards-playground/view-cards-playground.component';
import { Study2Component } from './Components/study2/study2.component';
import { StudyDueTimerComponent } from './Components/study2/study-due-timer/study-due-timer.component';
import { CardStudyComponent } from './Components/study2/card-study/card-study.component';
import { CircleComponent } from './Components/circle/circle.component';
import { HomeCircleComponent } from './Components/home/home-circle/home-circle.component';
import { SideBarComponent } from './Components/SideBar/side-bar/side-bar.component';
import { SideBarRootsComponent } from './Components/SideBar/side-bar-roots/side-bar-roots.component';
import { SideBarItemComponent } from './Components/SideBar/side-bar-item/side-bar-item.component';
import { StudyToogleComponent } from './Components/SideBar/study-toogle/study-toogle.component';
import { SideBarActionsComponent } from './Components/SideBar/side-bar-actions/side-bar-actions.component';
import { SideBarInfoComponent } from './Components/SideBar/side-bar-info/side-bar-info.component';
import { SideBarChaptersComponent } from './Components/SideBar/side-bar-chapters/side-bar-chapters.component';
import { SideBarNodesComponent } from './Components/SideBar/side-bar-nodes/side-bar-nodes.component';
import { MyContentComponent } from './Components/my-content/my-content.component';
import { ActionContentComponent } from './Components/action-content/action-content.component';
import { ShowRootsComponent } from './Components/Actions/show-roots/show-roots.component';
import { RootListItemComponent } from './Components/Actions/show-roots/root-list-item/root-list-item.component';
import { ShowChaptersComponent } from './Components/Actions/show-chapters/show-chapters.component';
import { ShowNodesComponent } from './Components/Actions/show-nodes/show-nodes.component';
import { ShowCardsComponent } from './Components/Actions/show-cards/show-cards.component';
import { CardComponent } from './Components/Actions/show-cards/card/card.component';
import { AddRootComponent } from './Components/Actions/add-root/add-root.component';
import { AddChapterComponent } from './Components/Actions/add-chapter/add-chapter.component';
import { AddNodeComponent } from './Components/Actions/add-node/add-node.component';
import { NodeTypeSwitchComponent } from './Components/Actions/add-node/node-type-switch/node-type-switch.component';
import { AddDeckComponent } from './Components/Actions/add-node/add-deck/add-deck.component';
import { AddExplainComponent } from './Components/Actions/add-node/add-explain/add-explain.component';

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
    MyDecksComponent,
    RootListOverviewComponent,
    MyRootsComponent,
    CreateRootComponent,
    RootOverviewComponent,
    ChapterListItemComponent,
    ChapterOverviewComponent,
    CreateChapterComponent,
    ChapterStudyComponent,
    DeckNodeComponent,
    ExplainNodeComponent,
    ExplainListOverviewComponent,
    CreateExplainComponent,
    ExplainOverviewComponent,
    EditExplainComponent,
    StudyExplainComponent,
    EditDeckComponent,
    MainDisplayComponent,
    MainDisplayHomeComponent,
    MainDisplayRootsComponent,
    MainDisplayChaptersComponent,
    ChapterContentPlaygroundComponent,
    PlaygroundTemplatesComponent,
    PlaygroundNodesComponent,
    PlaygroundNodeInfoComponent,
    CreateDeckPlaygroundComponent,
    PlaygroundCreateComponent,
    CreateCardPlaygroundComponent,
    CreateExplainPlaygroundComponent,
    EditDeckPlaygroundComponent,
    EditExplainPlaygroundComponent,
    LogInComponent,
    ViewCardsPlaygroundComponent,
    Study2Component,
    StudyDueTimerComponent,
    CardStudyComponent,
    CircleComponent,
    HomeCircleComponent,
    SideBarComponent,
    SideBarRootsComponent,
    SideBarItemComponent,
    StudyToogleComponent,
    SideBarActionsComponent,
    SideBarInfoComponent,
    SideBarChaptersComponent,
    SideBarNodesComponent,
    MyContentComponent,
    ActionContentComponent,
    ShowRootsComponent,
    RootListItemComponent,
    ShowChaptersComponent,
    ShowNodesComponent,
    ShowCardsComponent,
    CardComponent,
    AddRootComponent,
    AddChapterComponent,
    AddNodeComponent,
    NodeTypeSwitchComponent,
    AddDeckComponent,
    AddExplainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    SocialLoginModule,
    MatDialogModule
  ],
  providers: [
    // SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('658846696658-qio83qm2tc6q7sm856fu1igd6bingpv7.apps.googleusercontent.com') // your client id
          }
        ]
      }
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
