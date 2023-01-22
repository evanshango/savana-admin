import {IRole} from "./role";

export interface IGroup {
  name: string
  description: string
  slug: string
  roleCount: number
  memberCount: number
  roles: IRole[]
  active: boolean
  createdAt: Date
}
