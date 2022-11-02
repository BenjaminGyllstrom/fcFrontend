import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Card } from "src/app/Models/card.model";
import { StudyState } from "../appState";
import { RouterStateUrl } from "../router/custom-route-serializer";
import { getCurrentRoute } from "../router/router.selector";

export const getStudyState = createFeatureSelector<StudyState>('study');

export const getDeckIdStudyFromRoute = createSelector(
  getCurrentRoute, (route:RouterStateUrl) => {
    if(route.url.includes('/Deck/') && route.url.includes('/Study')) return route.params['nodeId'];
    return undefined;
  }
)
export const getRootIdStudyFromRoute = createSelector(
  getCurrentRoute, (route:RouterStateUrl) => {
    if(route.url.includes('/Deck/') && route.url.includes('/Study')) return route.params['rootId'];
    return undefined;
  }
)

export const getCardsForDeck = createSelector(
  getStudyState, getDeckIdStudyFromRoute, (state:StudyState, deckId:string|undefined) => {
    return {
      dueCards: state.dueCards.filter(card => card.deckId == deckId),
      newCards: state.newCards.filter(card => card.deckId == deckId)
    }
  }
)

export const getNewCards = createSelector(
  getStudyState, state => {
    return state.newCards
  }
)
export const getNewCardsForDeck = createSelector(
  getNewCards, getCurrentRoute, (cards:Card[], route:RouterStateUrl) => {
    const deckId = route.params['nodeId'];
    return cards.filter(card => card.deckId == deckId)
  }
)

export const getDueToday = createSelector(
  getCardsForDeck, deck => {
    const cards = sortByDueDate([...deck.dueCards])
    return cards
  }
)

export const cardsToStudyAvailable = createSelector(
  getCardsForDeck, deck => {
    return deck.dueCards.length > 0 || deck.newCards.length > 0
  }
)

export const getNew = createSelector(
  getCardsForDeck, deck => {
    return deck.newCards
  }
)

export const getDue = createSelector(
  getDueToday, cards => {
    return cards.filter(card => isDue(card))
  }
)


export const timeUntilDue = createSelector(
  getDueToday, cards => {
    const sortedCards = sortByDueDate([...cards])
    if(sortedCards.length == 0) return undefined
    if(isDue(sortedCards[0])) return new Date().getTime()
    return sortedCards[0].dueDate.getTime()
  }
)


export const getNextDueCardStudyForRoute = createSelector(
  getDue, getNew, (dueCards:Card[], newCards: Card[]) => {

    if(dueCards.length > 0) return dueCards[0]
    if(newCards.length > 0) return newCards[0]
    return undefined
  }
)



export const getNextCardStudyForRoute = createSelector(
  getDueToday, getNew, (dueCards:Card[], newCards: Card[]) => {
    if(dueCards.length > 0) return dueCards[0]
    if(newCards.length > 0) return newCards[0]
    return undefined
  }
)



export const loadedForDeck = (deckId: string) => createSelector(
  getStudyState, state => {
    return state.loadedForIds.findIndex(id => id == deckId) >= 0
  }
)

export const dueLoadedForRoot = (rootId: string) => createSelector(
  getStudyState, state => {
    return state.dueLoadedForRoot.findIndex(id => id == rootId) >= 0
  }
)

export function isDue(card: Card): boolean{
  const dateNow = new Date();
  return card.dueDate < dateNow
}

export function sortByDueDate(cards: Card[]){
  return cards.sort((a,b) => a.dueDate.getTime() - b.dueDate.getTime());
}
