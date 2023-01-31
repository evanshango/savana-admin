export interface IProduct {
  id: string,
  name: string,
  description: string,
  detail: string,
  inStock: number,
  initialPrice: number,
  finalPrice: number,
  discount: number,
  brand: string,
  displayImage: string,
  categories: string[],
  showCaseImages: string[],
  owner: string
  active: boolean
  createdAt: string
}
