export interface IPagination {
  page: number,
  pageSize: number,
  enabled: boolean
}

export interface IMetaData {
  pageNo: number,
  totalPages: number,
  pageSize: number,
  totalCount: number
}
