import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CardState } from "../appState";
import { RouterStateUrl } from "../router/custom-route-serializer";
import { getCurrentRoute } from "../router/router.selector";

export const getCardState = createFeatureSelector<CardState>('card');

export const getCards = createSelector(
  getCardState, state => state.cards
)

export const cardsLoadedForDeck = (deckId:string) => createSelector(
  getCardState, state => {
    return state.loadedForDeck.findIndex(id => id == deckId) >= 0;
  }
)

export const getDeckIdFromRoute = createSelector(
  getCurrentRoute, (route:RouterStateUrl) => {
    if(route.url.includes('/Deck/')) return route.params['nodeId'];
    return undefined;
  }
)
