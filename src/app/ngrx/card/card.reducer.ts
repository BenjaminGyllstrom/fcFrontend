import { createReducer, on } from '@ngrx/store'
import { Card } from 'src/app/Models/card.model'
import { CardState } from '../appState'
import * as fromCard from './card.actions'

export const initialState:CardState = {
  cards: [],
  loadedForDeck: []
}

export const cardReducer = createReducer(
  initialState,
  on(fromCard.getDeckCardsSuccessful, (state, {cards}) => {
    if(!cards || cards.length == 0) return {...state}
    const deckId = cards[0].deckId;
    cards.forEach(newCard => {
      if(state.cards.findIndex(card => card.id == newCard.id) >= 0)
      cards.splice(cards.indexOf(newCard))
    });
    return {...state, cards: [...state.cards, ...cards], loadedForDeck:[...state.loadedForDeck, deckId]}
  }),
  on(fromCard.createCardSuccessful, (state, {card}) => {
    return {...state, cards:[...state.cards, card]}
  }),
  on(fromCard.deleteCardSuccessful, (state, {card}) => {
    const cards = remove(card, [...state.cards]);
    return {...state, cards:cards}
  }),
  on(fromCard.updateCardSuccessful, (state, {card}) => {
    const oldCards = [...state.cards];
    const index = oldCards.findIndex(oldCard => oldCard.id == card.id)
    oldCards[index] = card;
    return {...state, cards: oldCards}
  })

)

export function remove(cardToRemove:Card, cards:Card[]){
  const index = cards.findIndex(card => card.id === cardToRemove.id);
  if(index == -1) return cards;
  cards.splice(index, 1);
  return cards
}

