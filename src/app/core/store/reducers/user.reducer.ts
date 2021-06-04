import { User } from '../../types/user.model';
import * as UserActions from '../actions/user.actions';


const initial = {
    id: "",
    username: "",
    password: "",
    avatar: "",
    created_at: new Date(),
    updated_at: new Date(),
    token: "",
}

export function UserReducer(state: User = initial, action: UserActions.Actions): any {
  switch (action.type) {
    case UserActions.SET_USER:
      return action.payload
    default:
      return state
  }
}
