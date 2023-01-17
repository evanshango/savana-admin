export interface IVoucher {
  title: string,
  voucher: string,
  discount: number,
  expiresAfter: IExpiresAfter
  expiresOn: Date,
  maxUse: number,
  useCount: number,
  expired: boolean,
  active: boolean,
  createdAt: Date
}

interface IExpiresAfter {
  type: string,
  value: number
}
