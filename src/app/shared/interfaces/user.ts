import {IGroup} from "./group";

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNo: string
  gender: string
  groupCount: number
  groups: IGroup[]
  active: boolean
  createdAt: string
}
