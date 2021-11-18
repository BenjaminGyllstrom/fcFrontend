import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { QuillModule } from 'ngx-quill'
import { QuillModule } from 'ngx-quill'

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
import { ChapterListItemComponent } from './Components/chapters/chapter-list-item/chapter-list-item.component';
import { ChapterOverviewComponent } from './Components/chapters/chapter-overview/chapter-overview.component';
import { CreateChapterComponent } from './Components/chapters/create-chapter/create-chapter.component';
import { ChapterStudyComponent } from './Components/chapters/chapter-study/chapter-study.component';
import { DeckNodeComponent } from './Components/Nodes/deck-node/deck-node.component';
import { ExplainNodeComponent } from './Components/Nodes/explain-node/explain-node.component';
import { ExplainListOverviewComponent } from './Components/Explains/explain-list-overview/explain-list-overview.component';
import { CreateExplainComponent } from './Components/Explains/create-explain/create-explain.component';
import { ExplainOverviewComponent } from './Components/Explains/explain-overview/explain-overview.component';
import { EditExplainComponent } from './Components/Explains/edit-explain/edit-explain.component';
import { StudyExplainComponent } from './Components/Explains/study-explain/study-explain.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EditDeckComponent } from './Components/Decks/edit-deck/edit-deck.component';
import { MainDisplayComponent } from './Components/MainDisplay/main-display/main-display.component';
import { MainDisplayHomeComponent } from './Components/MainDisplay/main-display-home/main-display-home.component';

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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
