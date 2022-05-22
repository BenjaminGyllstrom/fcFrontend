import { createAction, props } from "@ngrx/store";
import { Card } from "src/app/Models/card.model";

export const getDeckCards = createAction('[card] get deck cards', props<{deckId:string}>())
export const getDeckCardsSuccessful = createAction('[card] get deck cards successful', props<{cards:Card[]}>())

export const createCard = createAction('[card] create card', props<{card:Card}>())
export const createCardSuccessful = createAction('[card] create card successful', props<{card:Card}>())

export const deleteCard = createAction('[card] delete card', props<{card:Card}>())
export const deleteCardSuccessful = createAction('[card] delete card successful', props<{card:Card}>())

export const updateCard = createAction('[card] update card', props<{card:Card}>())
export const updateCardSuccessful = createAction('[card] update card successful', props<{card:Card}>())

export const downloadCardsSuccessful = createAction('[card] download cards successful', props<{cards:Card[]}>())
