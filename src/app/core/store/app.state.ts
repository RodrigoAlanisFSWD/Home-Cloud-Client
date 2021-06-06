import { Item } from "../types/item.model";
import { User } from "../types/user.model";

export interface AppState {
  readonly user: User,
  readonly cloud: Array<Item>
}
