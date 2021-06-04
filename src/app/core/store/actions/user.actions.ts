import { Action } from "@ngrx/store";
import { User } from "../../types/user.model";

export const SET_USER = '[USER] Register';

export class SetUser implements Action {
  readonly type = SET_USER

  constructor(public payload: User) {
  }
}


export type Actions = SetUser;
