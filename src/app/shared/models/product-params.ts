import {IPagination} from "../interfaces/pagination";

export class ProductParams implements IPagination {
  enabled: boolean
  page: number = 1
  pageSize: number = 20
  searchTerm: string = ''
  orderBy: string = ''
}
