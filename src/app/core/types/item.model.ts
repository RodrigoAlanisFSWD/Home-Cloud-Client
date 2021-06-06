export enum Type {
  DIR = "dir/",
  FILE = "file/"
}

export interface Item {
  name: string,
  type: Type,
}
