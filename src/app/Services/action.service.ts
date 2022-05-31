// import { Subject } from 'rxjs';
// import { Injectable } from '@angular/core';

// export enum Action {
//   Default,
//   MyContentOverview,
//   RootIntroduction,
//   Chapters,
//   Nodes,
//   ExplainOverview,
//   DeckOverview,
//   Cards,
//   AddRoot,
//   AddChapter,
//   AddNode,
//   AddCard,
//   Study
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ActionService {

//   constructor(){}

//   action: Action = Action.Default;
//   actionChange:Subject<Action> = new Subject<Action>();

//   setAction(action:Action|null, notify = true){
//     if(action == null) action = Action.Default

//     if(this.action != action){
//       this.action = action;

//       if(notify)this.actionChange.next(this.action);
//     }
//   }

//   getAction(actionString: string) : Action{
//     switch(actionString){
//       case('MyContentOverview'):{
//         return Action.MyContentOverview
//       }
//       case('RootIntroduction'):{
//         return Action.RootIntroduction
//       }
//       case('Chapters'):{
//         return Action.Chapters
//       }
//       case('Nodes'):{
//         return Action.Nodes
//       }
//       case('ExplainOverview'):{
//         return Action.ExplainOverview
//       }
//       case('DeckOverview'):{
//         return Action.DeckOverview
//       }
//       case('Cards'):{
//         return Action.Cards
//       }
//       case('AddCard'):{
//         return Action.AddCard
//       }
//       case('Study'):{
//         return Action.Study
//       }
//     }
//     return Action.Default;
//   }
// }
