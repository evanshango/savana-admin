export interface IVoucherResponse {
  title: string,
  voucher: string,
  discount: number,
  expiresOn: Date,
  maxUse: number,
  useCount: number,
  createdAt: Date
}
