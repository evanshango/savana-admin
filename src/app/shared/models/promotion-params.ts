import {IPagination} from "../interfaces/pagination";

export class PromotionParams implements IPagination {
  enabled: boolean
  searchTerm: string = ''
  orderBy: string = ''
  page: number = 1
  pageSize: number = 20
}
