import { Action } from "@ngrx/store";

export const SET_CLOUD = '[CLOUD] SET';
export const DELETE_ITEM_CLOUD = '[CLOUD] DELETE ITEM';

export class SetCloud implements Action {
  readonly type = SET_CLOUD

  constructor(public payload: any) {
  }
}

export class DeleteItemCloud implements Action {
  readonly type = DELETE_ITEM_CLOUD

  constructor(public payload: any) {
  }
}



export type Actions = SetCloud;
