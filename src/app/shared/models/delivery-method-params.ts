import {IPagination} from "../interfaces/pagination";

export class DeliveryMethodParams implements IPagination {
  enabled: boolean;
  page: number = 1;
  pageSize: number = 20;
  title: string = ''
}
