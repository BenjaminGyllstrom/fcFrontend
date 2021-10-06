import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { QuillModule } from 'ngx-quill'
import { QuillModule } from 'ngx-quill'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
