import {IPagination} from "../interfaces/pagination";

export class BrandParams implements IPagination {
  enabled: boolean
  page: number = 1
  pageSize: number = 20
  name: string = ''
  orderBy: string = ''
}
