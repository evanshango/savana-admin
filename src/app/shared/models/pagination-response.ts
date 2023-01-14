import {IMetaData} from "../interfaces/pagination";

export class PaginationResponse<T> {
  metaData?: IMetaData
  items?: T

  constructor(metaData?: IMetaData, items?: T) {
    this.metaData = metaData
    this.items = items
  }
}
