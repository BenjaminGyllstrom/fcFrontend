import { createReducer, on } from "@ngrx/store";
import { Card } from "src/app/Models/card.model";
import { StudyState } from "../appState";
import { createCardSuccessful } from "../card/card.actions";
import * as fromStudy from "./study.actions"

export const initialState:StudyState = {
  // nodes:[],
  dueCards: [],
  newCards: [],
  loadedForIds:[],
  dueExists:false
}

export const studyReducer = createReducer(
  initialState,
  on(fromStudy.getCardsDeckSuccessul, (state, {cards}) => {
    if(!cards || cards.length == 0) return {...state}
    const deckId = cards[0].deckId;
    const newCards = getNewCards([...cards]).filter(newCard => state.newCards.findIndex(card => card.id == newCard.id) == -1)
    const dueCards = getDueCards([...cards]).filter(newCard => state.dueCards.findIndex(card => card.id == newCard.id) == -1)
    return {...state, dueCards: [...state.dueCards, ...dueCards], newCards: [...state.newCards, ...newCards], loadedForIds: [...state.loadedForIds, deckId]}
  }),
  on(fromStudy.updateCardDueSuccessul, (state, {card}) => {

    if(state.dueCards.findIndex(oldCard => oldCard.id == card.id) >= 0){

      if(!isDueToday(card)){
        const dueCards = remove(card, [...state.dueCards]);
        return {...state, dueCards: dueCards}
      }

      const dueCards = [...state.dueCards]
      const index = dueCards.findIndex(oldCard => oldCard.id == card.id)
      dueCards[index] = card
      return {...state, dueCards: dueCards}
    }
    if(state.newCards.findIndex(oldCard => oldCard.id == card.id) >= 0){
      let dueCards = [...state.dueCards]
      if(isDueToday(card)){
        dueCards.push(card)
      }

      const newCards = [...state.newCards]
      const index = newCards.findIndex(oldCard => oldCard.id == card.id)
      newCards.splice(index, 1);
      return {...state, dueCards: dueCards, newCards: newCards}
    }
    return {...state}
  }),
  on(fromStudy.checkDue, (state, {deckId}) => {
    const dueExists = containsDue(state.dueCards, deckId)
    return {...state, dueExists:dueExists}}),
  on(createCardSuccessful, (state, {card}) => {
    return {...state, newCards: [...state.newCards, card]}
  }),
  on(fromStudy.setExplainAsReadSuccessful, (state, {explain}) => {
    console.log('set as read');

    return {...state}
  })
)

export function remove(cardToRemove:Card, cards:Card[]){
  const index = cards.findIndex(card => card.id === cardToRemove.id);
  if(index == -1) return cards;
  cards.splice(index, 1);
  return cards
}

export function containsDue(cards: Card[], deckId:string){
  return cards.findIndex(card => {
    return card.deckId == deckId && isDue(card)}) >= 0
}

export function isDue(card: Card): boolean{
  const dateNow = new Date();
  return card.dueDate < dateNow
}

export function getNewCards(cards:Card[]){
  const newCards:Card[] = [];
  cards.forEach(card => {
    if(card.new) newCards.push(card)
  });
  return newCards
}
export function isDueToday(card: Card): boolean{
  const dateNow = new Date();
  dateNow.setHours(23,59,59,999)
  return card.dueDate < dateNow
}
export function getDueCards(cards:Card[]){
  const dueCards:Card[] = [];
  cards.forEach(card => {
    if(!card.new) dueCards.push(card)
  });
  return dueCards
}
