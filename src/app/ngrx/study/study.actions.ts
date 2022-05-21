import { createAction, props } from "@ngrx/store";
import { Card } from "src/app/Models/card.model";
import { Explain } from "src/app/Models/explain.model";



export const studyDeck = createAction('[study] get deck', props<{deckId:string}>())
export const getCardsDeckSuccessul = createAction('[study] get cards deck successul', props<{cards:Card[]}>())

export const getDueCardsDeck = createAction('[study] get due cards deck', props<{deckId:string}>())
export const getDueCardsDeckSuccessul = createAction('[study] get due cards deck successul', props<{cards:Card[]}>())

export const getNewCardsDeck = createAction('[study] get new cards deck', props<{deckId:string}>())
export const getNewCardsDeckSuccessul = createAction('[study] get new cards deck successul', props<{cards:Card[]}>())

export const updateCardDue = createAction('[study] update card due', props<{card: Card, nextRecurrence:string}>())
export const updateCardDueSuccessul = createAction('[study] update card due successul', props<{card: Card}>())

export const checkDue = createAction('[study] check due', props<{deckId:string}>())

export const setExplainAsRead = createAction('[study] set explain as read', props<{explain: Explain}>())
export const setExplainAsReadSuccessful = createAction('[study] set explain as read successful', props<{explain: Explain}>())
