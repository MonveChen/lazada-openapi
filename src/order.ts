/*
 * @Author: Monve
 * @Date: 2022-09-05 15:37:13
 * @LastEditors: Monve
 * @LastEditTime: 2022-09-05 16:51:25
 * @FilePath: /lazada-openapi/src/order.ts
 */
import { ApiShopMethod, ExtraRes, Get } from "./utils/request"

type Address = {
  address1: string,
  phone2: string,
  first_name: string,
  phone: string,
  address5: string,
  post_code: string,
  address4: string,
  last_name: string,
  country: string,
  address3: string,
  address2: string,
  city: string
}

export class OrderApi {
  /**
   * Use this API to get the list of items for a range of orders1..
   * @param The maximum number of orders that can be returned. The supported maximum number is 100.
   */
  @Get({ url: '/orders/get' })
  get_orders!: ApiShopMethod<
    {
      sort_direction?: string, update_before?: string, created_before?: string, offset?: number,
      created_after?: string, update_after?: string, limit?: number, sort_by?: string,
      status?: string
    },
    ExtraRes & {
      data: {
        countTotal: number,
        count: number,
        orders: {
          branch_number: string,
          tax_code: string,
          extra_attributes: string,
          address_updated_at: string,
          shipping_fee: string,
          customer_first_name: string,
          payment_method: string,
          statuses: string[],
          remarks: string,
          order_number: string,
          order_id: string,
          voucher: string,
          national_registration_number: string,
          promised_shipping_times: string,
          items_count: number,
          voucher_platform: string,
          voucher_seller: string,
          created_at: string,
          price: string,
          address_billing: Address,
          warehouse_code: string,
          shipping_fee_original: string,
          shipping_fee_discount_seller: string,
          shipping_fee_discount_platform: string,
          address_shipping: Address,
          customer_last_name: string,
          gift_option: string,
          voucher_code: string,
          updated_at: string,
          delivery_info: string,
          gift_message: string
        }[]
      }
    }
  >

  /**
   * Use this API to get the item information of an order.
   * @param The maximum number of orders that can be returned. The supported maximum number is 100.
   */
  @Get({ url: '/order/items/get' })
  get_order_items!: ApiShopMethod<
    { order_id: string },
    ExtraRes & {
      data: {
        pick_up_store_info: {
          pick_up_store_name: string,
          pick_up_store_address: string,
          pick_up_store_code: string,
          pick_up_store_open_hour: string[]
        },
        purchase_order_number: string,
        name: string,
        product_main_image: string,
        item_price: string,
        tax_amount: string,
        status: string,
        cancel_return_initiator: string,
        voucher_platform: string,
        voucher_seller: string,
        order_type: string,
        stage_pay_status: string,
        warehouse_code: string,
        voucher_seller_lpi: string,
        voucher_platform_lpi: string,
        buyer_id: string,
        shipping_fee_original: string,
        shipping_fee_discount_seller: string,
        shipping_fee_discount_platform: string,
        voucher_code_seller: string,
        voucher_code_platform: string,
        delivery_option_sof: string,
        is_fbl: string,
        is_reroute: string,
        reason: string,
        digital_delivery_info: string,
        promised_shipping_time: string,
        order_id: string,
        voucher_amount: string,
        return_status: string,
        shipping_type: string,
        shipment_provider: string,
        variation: string,
        created_at: string,
        invoice_number: string,
        shipping_amount: string,
        currency: string,
        order_flag: string,
        shop_id: string,
        sla_time_stamp: string,
        sku: string,
        voucher_code: string,
        wallet_credits: string,
        updated_at: string,
        is_digital: number,
        tracking_code_pre: string,
        order_item_id: number,
        package_id: string,
        tracking_code: string,
        shipping_service_cost: number,
        extra_attributes: string,
        paid_price: string,
        shipping_provider_type: string,
        product_detail_url: string,
        shop_sku: string,
        reason_detail: string,
        purchase_order_id: string,
        sku_id: string,
        product_id: string
      }[]
    }
  >
}