import { Item, Type } from '../../types/item.model';
import * as CloudActions from '../actions/cloud.actions';

const initial: Array<Item> = [
  {
    name: "",
    type: Type.FILE
  }
]

export function CloudReducer(state: Array<Item> = initial, action: CloudActions.Actions): any {
  switch (action.type) {
    case CloudActions.SET_CLOUD:
      return action.payload
    case CloudActions.DELETE_ITEM_CLOUD:
      const final = initial.filter(item => item.name !== action.payload)
      return final
    default:
      return state
  }
}
