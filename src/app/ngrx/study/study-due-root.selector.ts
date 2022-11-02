import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Card } from "src/app/Models/card.model";
import { StudyState } from "../appState";
import { RouterStateUrl } from "../router/custom-route-serializer";
import { getCurrentRoute } from "../router/router.selector";

export const getStudyState = createFeatureSelector<StudyState>('study');


const getDueCards = createSelector(
  getStudyState, state => {
    return state.dueCards
  }
)
const amountOfDue = createSelector(
  getStudyState, state => {
    const amountOfDueNow = state.dueCards.filter(card => isDue(card)).length
    return amountOfDueNow
  }
)

const getNewCards = createSelector(
  getStudyState, state => {
    return state.newCards
  }
)

const getNewCardsForDeck = createSelector(
  getNewCards, getCurrentRoute, (cards:Card[], route:RouterStateUrl) => {
    const deckId = route.params['nodeId'];
    return cards.filter(card => card.deckId == deckId)
  }
)


//need to have amountOfDue. in order to run selector when the amount is updated. Probably is a better way to do this.. Memoization
const getDueToday = createSelector(
  amountOfDue, getDueCards, getCurrentRoute, (amountOfDue:number, dueCards:Card[], route:RouterStateUrl) => {
    const rootId = route.params['rootId'];
    return dueCards.filter(card => card.rootId == rootId)
  }
)

export const getDue = createSelector(
  getDueToday, cards => {
    const sortedCards = sortByDueDate(cards)
    return sortedCards.filter(card => isDue(card))
  }
)

export const getCardsForRoot = createSelector(
  getDue, getNewCardsForDeck, (dueCards:Card[], newCards:Card[]) => {
    return {dueCards: dueCards, newCards:newCards}
  }
)

function isDue(card: Card): boolean{
  const dateNow = new Date();
  return card.dueDate < dateNow
}

function sortByDueDate(cards: Card[]){
  return [...cards].sort((a,b) => a.dueDate.getTime() - b.dueDate.getTime());
}
