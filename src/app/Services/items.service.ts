import { IExplain } from 'src/app/Models/explain.model';
import { IDeck } from 'src/app/Models/deck.model';
import { Explain } from 'src/app/Models/explain.model';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { IRoot } from 'src/app/Models/root.model';
import { IChapter } from 'src/app/Models/chapter.model';
import { ChapterHttpService } from 'src/app/Services/Http/ChapterHttp.service';
import { map, tap } from 'rxjs/operators';
import { RootHttpService } from 'src/app/Services/Http/RootHttp.service';
import { observable, Observable } from 'rxjs';
import { Chapter } from 'src/app/Models/chapter.model';
import { Root } from 'src/app/Models/root.model';
import { Injectable } from '@angular/core';
import { Deck } from '../Models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private rootHttpService: RootHttpService,
    private chapterHttpService: ChapterHttpService,
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService
  ){}

  roots:Root[]

  root:Root;
  chapter:Chapter;
  node:any;

  postRoot(root:Root):Observable<any>{
    return this.rootHttpService.post(root).pipe(
      map((createdRoot:IRoot)=>{return this.rootHttpService.parseToRoot(createdRoot)}),
      tap((createdRoot:Root) => {this.roots.push(createdRoot);}),
    )
  }
  postChapter(chapter:Chapter){
    return this.chapterHttpService.post(chapter).pipe(
      map((createdChapter:IChapter) => {return this.chapterHttpService.parseToChapter(createdChapter)}),
      tap((createdChapter:Chapter) => {this.root.chapters.push(createdChapter);})
    )
  }
  postDeck(deck:Deck){
    return this.deckHttpService.post(deck).pipe(
      map((createdDeck:IDeck) => {return this.deckHttpService.parseToDeck(createdDeck)}),
      tap((createdDeck:Deck) => {this.chapter.nodes.push(createdDeck);}),
    )
  }
  postExplain(explain: Explain){
    return this.explainHttpService.post(explain).pipe(
      map((createdExplain:IExplain) => {return this.explainHttpService.parseToExplain(createdExplain)}),
      tap((createdExplain:Explain) => {this.chapter.nodes.push(createdExplain);})
    )
  }

  updateRoot(root:Root){
    return this.rootHttpService.edit(root, root.id).pipe(
      map((updatedRoot:IRoot)=>{return this.rootHttpService.parseToRoot(updatedRoot)}),
      tap((updatedRoot:Root) => {this.replaceRoot(updatedRoot);}),
    )
  }
  updateChapter(chapter:Chapter){
    return this.chapterHttpService.edit(chapter, chapter.id).pipe(
      map((updatedChapter:IChapter)=>{return this.chapterHttpService.parseToChapter(updatedChapter)}),
      tap((updatedChapter:Chapter) => {this.replaceChapter(updatedChapter);}),
    )
  }

  updateDeck(deck:Deck){
    return this.deckHttpService.edit(deck, deck.id).pipe(
      map((updatedDeck:IDeck)=>{return this.deckHttpService.parseToDeck(updatedDeck)}),
      tap((updatedDeck:Deck) => {this.replaceDeck(updatedDeck);}),
    )
  }
  updateExplain(explain:Explain){
    return this.explainHttpService.edit(explain, explain.id).pipe(
      map((updatedExplain:IExplain)=>{return this.explainHttpService.parseToExplain(updatedExplain)}),
      tap((updatedExplain:Explain) => {this.replaceExplain(updatedExplain);}),
    )
  }
  private replaceRoot(replacementRoot:Root){
    this.roots.forEach(root => {
      if(root.id === replacementRoot.id)
      this.roots.splice(this.roots.indexOf(root), 1, replacementRoot)
    });
  }

  private replaceChapter(replacementChapter:Chapter){
    this.root.chapters.forEach(chapter => {
      if(chapter.id === replacementChapter.id)
      this.root.chapters.splice(this.root.chapters.indexOf(chapter), 1, replacementChapter)
    });
  }
  private replaceDeck(replacementDeck:Deck){
    this.chapter.nodes.forEach(node => {
      if( node.type == 'deck' && node.id === replacementDeck.id)
      this.chapter.nodes.splice(this.root.chapters.indexOf(node), 1, replacementDeck)
    });
  }
  private replaceExplain(replacementExplain:Explain){
    this.chapter.nodes.forEach(node => {
      if( node.type == 'explain' && node.id === replacementExplain.id)
      this.chapter.nodes.splice(this.root.chapters.indexOf(node), 1, replacementExplain)
    });
  }

  deleteRoot(root:Root){
    return this.rootHttpService.delete(root.id).pipe(
      map((updatedRoot:IRoot)=>{return this.rootHttpService.parseToRoot(updatedRoot)}),
      tap((updatedRoot:Root) => {this.removeRoot(updatedRoot);}),
    )
  }
  deleteChapter(chapter:Chapter){
    return this.chapterHttpService.delete(chapter.id).pipe(
      map((updatedChapter:IChapter)=>{return this.chapterHttpService.parseToChapter(updatedChapter)}),
      tap((updatedChapter:Chapter) => {this.removeChapter(updatedChapter);}),
    )
  }

  deleteDeck(deck:Deck){
    return this.deckHttpService.delete(deck.id).pipe(
      map((updatedDeck:IDeck)=>{return this.deckHttpService.parseToDeck(updatedDeck)}),
      tap((updatedDeck:Deck) => {this.removeDeck(updatedDeck);}),
    )
  }
  deleteExplain(explain:Explain){
    return this.explainHttpService.delete(explain.id).pipe(
      map((updatedExplain:IExplain)=>{return this.explainHttpService.parseToExplain(updatedExplain)}),
      tap((updatedExplain:Explain) => {this.removeExplain(updatedExplain);}),
    )
  }

  private removeRoot(rootToRemove:Root){
    this.roots.forEach(root => {
      if(root.id === rootToRemove.id)
      this.roots.splice(this.roots.indexOf(root), 1)
    });
  }
  private removeChapter(chapterToRemove:Chapter){
    this.root.chapters.forEach(chapter => {
      if(chapter.id === chapterToRemove.id)
      this.root.chapters.splice(this.root.chapters.indexOf(chapter), 1)
    });
  }
  private removeDeck(deckToRemove:Deck){
    this.chapter.nodes.forEach(node => {
      if( node.type == 'deck' && node.id === deckToRemove.id)
      this.chapter.nodes.splice(this.root.chapters.indexOf(node), 1)
    });
  }
  private removeExplain(explainToRemove:Explain){
    this.chapter.nodes.forEach(node => {
      if( node.type == 'explain' && node.id === explainToRemove.id)
      this.chapter.nodes.splice(this.root.chapters.indexOf(node), 1)
    });
  }

  getRoots():Observable<any>{
    if( this.roots == null || this.roots.length == 0)
    {
      return this.rootHttpService.get().pipe(
        map((collectedRoots:IRoot[])=> {
          return this.rootHttpService.parseToRoots(collectedRoots);
        }),
        tap((collectedRoots:Root[]) => {this.roots = collectedRoots})
      )
    }
    console.log('exists roots already');

    return new Observable(observer => observer.next(this.roots))
  }

  getChapters(root: Root):Observable<any>{
    if(root.chapters == null || root.chapters.length == 0){

      return this.rootHttpService.getById(root.id).pipe(
        map((collectedRoot:IRoot) => {
          return this.chapterHttpService.parseToChapters(collectedRoot.chapters)
        }),
        tap((collectedChapters:Chapter[]) => {this.root.chapters = collectedChapters})
      )
    }
    console.log('exists chaptesr already');
    return new Observable(observer => observer.next(root.chapters))
  }

  getNodes(chapter: Chapter):Observable<any>{
    if(chapter.nodes == null || chapter.nodes.length == 0){
      return this.chapterHttpService.getById(chapter.id).pipe(
        map((collectedChapter:IChapter)=> {
          return this.chapterHttpService.getListOfNodes(collectedChapter.nodes)
        }),
        tap((collectedNodes: any[]) => {this.chapter.nodes = collectedNodes})
      )
    }

    return new Observable(observer => observer.next(chapter.nodes))
  }
}
