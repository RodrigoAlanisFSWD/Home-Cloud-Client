import { User } from '../../types/user.model';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  data: User,
}

const initial: UserState = {
  data: {
    id: "",
    username: "",
    password: "",
    avatar: "",
    created_at: new Date(),
    updated_at: new Date(),
    token: ""
  },
}

export function UserReducer(state: UserState = initial, action: UserActions.Actions): any {
  switch (action.type) {
    case UserActions.SET_USER:
      return {...state, data: action.payload}
    default:
      return state
  }
}
