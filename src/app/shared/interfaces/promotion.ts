import {IExpiresAfter} from "./expires-after";

export interface IPromotion {
  id: string,
  title: string,
  description: string,
  product: string,
  productImage: string
  discount: number,
  expiresAfter: IExpiresAfter
  expiresAt: Date,
  createdAt: Date
  active: boolean
}
