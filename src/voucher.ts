/*
 * @Author: Monve
 * @Date: 2022-09-05 17:11:39
 * @LastEditors: Monve
 * @LastEditTime: 2022-09-14 17:43:35
 * @FilePath: /lazada-openapi/src/voucher.ts
 */
import { ApiShopMethod, ExtraRes, Get } from "./utils/request"

export type Voucher = {
  criteria_over_money: string,
  apply: string,
  voucher_type: string,
  collect_start: number,
  display_area: string,
  period_end_time: number,
  voucher_name: string,
  voucher_discount_type: string,
  offering_money_value_off: string,
  period_start_time: number,
  limit: number,
  order_used_budget: number,
  currency: string,
  id: number,
  issued: number,
  max_discount_offering_money_value: string,
  voucher_code: string,
  offering_percentage_discount_off: string,
  status: string
}

export class VoucherApi {
  /**
   * query seller voucher promotion list
   * @param The maximum number of orders that can be returned. The supported maximum number is 100.
   */
  @Get({ url: '/promotion/vouchers/get' })
  get_voucher_list!: ApiShopMethod<
    {
      cur_page?: number,
      voucher_type: string,
      name?: string,
      page_size?: number,
      status?: string
    },
    ExtraRes & {
      data: {
        total: number,
        current: number,
        data_list: Voucher[],
        page_size: number
      }
    }
  >

  /**
   * get a seller voucher promotion detail
   */
  @Get({ url: '/promotion/voucher/get' })
  get_voucher!: ApiShopMethod<
    {
      voucher_type: string,
      id: number,
    },
    ExtraRes & {
      data: Voucher
    }
  >
}