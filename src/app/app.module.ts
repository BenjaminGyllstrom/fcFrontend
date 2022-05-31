import { AuthInterceptor } from './Services/auth.interceptor';
import { Action } from 'src/app/Services/action.service';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import {DragDropModule} from '@angular/cdk/drag-drop';
// import {  } from '@angular/material/';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { DeckOverviewComponent } from './Components/Actions/deck-overview/deck-overview.component';
import { EditCardComponent } from './Components/Actions/show-cards/edit-card/edit-card.component';
import { ChapterListItemComponent } from './Components/Actions/show-chapters/chapter-list-item/chapter-list-item.component';
import { DeckNodeComponent } from './Components/Nodes/deck-node/deck-node.component';
import { ExplainNodeComponent } from './Components/Nodes/explain-node/explain-node.component';
import { ExplainOverviewComponent } from './Components/Actions/explain-overview/explain-overview.component';
import { StudyExplainComponent } from './Components/Actions/study-node/study-explain/study-explain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LogInComponent } from './Components/Profile/log-in/log-in.component';
import { GoogleLoginProvider, SocialAuthService, SocialLoginModule } from 'angularx-social-login';
import {AuthGuardService} from './Services/AuthGuard.service';
import { StudyDueTimerComponent } from './Components/Actions/study-node/study-due-timer/study-due-timer.component';
import { CardStudyComponent } from './Components/Actions/study-node/card-study/card-study.component';
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
import { QuillShowComponent } from './Components/Quill/quill-show/quill-show.component';
import { QuillEditComponent } from './Components/Quill/quill-edit/quill-edit.component';
import { AddCardComponent } from './Components/Actions/add-card/add-card.component';
import { DeleteItemComponent } from './Components/SideBar/delete-item/delete-item.component';
import { StudyNodeComponent } from './Components/Actions/study-node/study-node.component';
import { ExploreComponent } from './Components/explore/explore.component';
import { RootExploreItemComponent } from './Components/explore/root-explore-item/root-explore-item.component';
import { ExploreFilterComponent } from './Components/explore/explore-filter/explore-filter.component';
import { ExploreRootOverviewComponent } from './Components/explore-root-overview/explore-root-overview.component';
import { NodesRootOverviewComponent } from './Components/explore-root-overview/nodes-root-overview/nodes-root-overview.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './ngrx/router/custom-route-serializer';
import { rootReducer } from './ngrx/root/root.reducer';
import { RootEffects } from './ngrx/root/root.effects';
import { chapterReducer } from './ngrx/chapter/chapter.reducer';
import { ChapterEffects } from './ngrx/chapter/chapter.effects';
import { nodeReducer } from './ngrx/node/node.reducer';
import { NodeEffects } from './ngrx/node/node.effects';
import { RouterEffects } from './ngrx/router/router.effects';
import { cardReducer } from './ngrx/card/card.reducer';
import { CardEffects } from './ngrx/card/card.effects';
import { studyReducer } from './ngrx/study/study.reducer';
import { StudyEffects } from './ngrx/study/study.effects';
import { StudyCardsComponent } from './Components/Actions/study-node/study-cards/study-cards.component';
import { environment } from "../environments/environment";
import { LoginComponent } from './Components/Profile/login/login.component';
import { LoginPopupComponent } from './Components/Profile/login-popup/login-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DeckOverviewComponent,
    EditCardComponent,
    ChapterListItemComponent,
    DeckNodeComponent,
    ExplainNodeComponent,
    ExplainOverviewComponent,
    StudyExplainComponent,
    LogInComponent,
    StudyDueTimerComponent,
    CardStudyComponent,
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
    QuillShowComponent,
    QuillEditComponent,
    AddCardComponent,
    DeleteItemComponent,
    StudyNodeComponent,
    ExploreComponent,
    RootExploreItemComponent,
    ExploreFilterComponent,
    ExploreRootOverviewComponent,
    NodesRootOverviewComponent,
    StudyCardsComponent,
    LoginComponent,
    LoginPopupComponent,
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
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    DragDropModule,
    StoreModule.forRoot({root: rootReducer, chapter: chapterReducer, node:nodeReducer, card:cardReducer, study:studyReducer, router: routerReducer}),
    EffectsModule.forRoot([RootEffects, ChapterEffects, NodeEffects, CardEffects, StudyEffects, RouterEffects]),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleAuthKey) // your client id
          }
        ]
      }
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
