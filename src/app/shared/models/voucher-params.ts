import {IPagination} from "../interfaces/pagination";

export class VoucherParams implements IPagination {
  enabled: boolean = true;
  page: number = 1;
  pageSize: number = 20;
  voucher: string = ''
}
