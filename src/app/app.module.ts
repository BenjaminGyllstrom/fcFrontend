import { AuthInterceptor } from './features/shared/data-access/Http/auth.interceptor';
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
import { HomeComponent } from './features/home/feature/home/home.component';
import { HeaderComponent } from './features/my-content/feature/header/header.component';
import { DeckOverviewComponent } from './features/nodes/feature/deck-overview/deck-overview.component';
import { EditCardComponent } from './features/cards/ui/edit-card/edit-card.component';
import { ChapterListItemComponent } from './features/chapters/ui/chapter-list-item/chapter-list-item.component';
import { DeckNodeComponent } from './features/nodes/ui/deck-node/deck-node.component';
import { ExplainNodeComponent } from './features/nodes/ui/explain-node/explain-node.component';
import { ExplainOverviewComponent } from './features/nodes/feature/explain-overview/explain-overview.component';
import { StudyExplainComponent } from './features/study/feature/study-explain/study-explain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LogInComponent } from './features/Profile/log-in/log-in.component';
import { GoogleLoginProvider, SocialAuthService, SocialLoginModule } from 'angularx-social-login';
import {AuthGuardService} from './features/shared/utils/AuthGuard.service';
import { StudyDueTimerComponent } from './features/study/ui/study-due-timer/study-due-timer.component';
import { CardStudyComponent } from './features/study/feature/card-study/card-study.component';
import { HomeCircleComponent } from './features/home/ui/home-circle/home-circle.component';
import { SideBarComponent } from './features/sidebar/feature/side-bar/side-bar.component';

import { SideBarRootsComponent } from './features/sidebar/ui/side-bar-roots/side-bar-roots.component';
import { SideBarItemComponent } from './features/sidebar/ui/side-bar-item/side-bar-item.component';
import { StudyToogleComponent } from './features/sidebar/ui/study-toogle/study-toogle.component';
import { SideBarActionsComponent } from './features/sidebar/ui/side-bar-actions/side-bar-actions.component';
import { SideBarInfoComponent } from './features/sidebar/ui/side-bar-info/side-bar-info.component';
import { SideBarChaptersComponent } from './features/sidebar/ui/side-bar-chapters/side-bar-chapters.component';
import { SideBarNodesComponent } from './features/sidebar/ui/side-bar-nodes/side-bar-nodes.component';
import { MyContentComponent } from './features/my-content/feature/my-content/my-content.component';
import { ShowRootsComponent } from './features/roots/feature/show-roots/show-roots.component';
import { RootListItemComponent } from './features/roots/ui/root-list-item/root-list-item.component';
import { ShowChaptersComponent } from './features/chapters/feature/show-chapters/show-chapters.component';
import { ShowNodesComponent } from './features/nodes/feature/show-nodes/show-nodes.component';
import { ShowCardsComponent } from './features/cards/feature/show-cards/show-cards.component';
import { CardComponent } from './features/cards/ui/card/card.component';
import { AddRootComponent } from './features/roots/feature/add-root/add-root.component';
import { AddChapterComponent } from './features/chapters/feature/add-chapter/add-chapter.component';
import { AddNodeComponent } from './features/nodes/feature/add-node/add-node.component';
import { NodeTypeSwitchComponent } from './features/nodes/ui/node-type-switch/node-type-switch.component';
import { AddDeckComponent } from './features/nodes/ui/add-deck/add-deck.component';
import { AddExplainComponent } from './features/nodes/ui/add-explain/add-explain.component';
import { QuillShowComponent } from './features/shared/ui/quill-show/quill-show.component';
import { QuillEditComponent } from './features/shared/ui/quill-edit/quill-edit.component';
import { AddCardComponent } from './features/cards/feature/add-card/add-card.component';
import { DeleteItemComponent } from './features/sidebar/ui/delete-item/delete-item.component';
import { StudyNodeComponent } from './features/study/feature/study-node/study-node.component';
import { ExploreComponent } from './features/explore/feature/explore/explore.component';
import { RootExploreItemComponent } from './features/explore/ui/root-explore-item/root-explore-item.component';
import { ExploreFilterComponent } from './features/explore/ui/explore-filter/explore-filter.component';
import { ExploreRootOverviewComponent } from './features/explore/feature/explore-root-overview/explore-root-overview.component';
import { NodesRootOverviewComponent } from './features/explore/ui/nodes-root-overview/nodes-root-overview.component';
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
import { StudyCardsComponent } from './features/study/feature/study-cards/study-cards.component';
import { environment } from "../environments/environment";
import { LoginComponent } from './features/Profile/login/login.component';
import { LoginPopupComponent } from './features/Profile/login-popup/login-popup.component';
import { RootListItemRichComponent } from './features/roots/ui/root-list-item-rich/root-list-item-rich.component';
import { ItemStatusComponent } from './features/shared/ui/item-status/item-status.component';
import { RootListHeadersComponent } from './features/roots/ui/root-list-headers/root-list-headers.component';
import { ChapterListItemRichComponent } from './features/chapters/ui/chapter-list-item-rich/chapter-list-item-rich.component';
import { ChapterListHeadersComponent } from './features/chapters/ui/chapter-list-headers/chapter-list-headers.component';
import { ShowNodesRichComponent } from './features/nodes/feature/show-nodes-rich/show-nodes-rich.component';
import { NodeListItemRichComponent } from './features/nodes/ui/node-list-item-rich/node-list-item-rich.component';
import { NodeListHeadersComponent } from './features/nodes/ui/node-list-headers/node-list-headers.component';
import { NodeTreeComponent } from './features/nodes/ui/node-tree/node-tree.component';
import { ExploreListHeadersComponent } from './features/explore/ui//explore-list-headers/explore-list-headers.component';
import { exploreReducer } from './ngrx/explore/explore.reducer';
import { ExploreEffects } from './ngrx/explore/explore.effects';

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
    RootListItemRichComponent,
    ItemStatusComponent,
    RootListHeadersComponent,
    ChapterListItemRichComponent,
    ChapterListHeadersComponent,
    ShowNodesRichComponent,
    NodeListItemRichComponent,
    NodeListHeadersComponent,
    NodeTreeComponent,
    ExploreListHeadersComponent,
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
    StoreModule.forRoot({root: rootReducer, chapter: chapterReducer, node:nodeReducer, card:cardReducer, study:studyReducer, explore: exploreReducer,router: routerReducer}),
    EffectsModule.forRoot([RootEffects, ChapterEffects, NodeEffects, CardEffects, StudyEffects, ExploreEffects, RouterEffects]),
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
