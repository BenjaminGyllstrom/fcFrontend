import { Root } from "../Models/root.model"

export interface AppState {
  root: RootState

}

export interface RootState{
  roots: Root[]
}
