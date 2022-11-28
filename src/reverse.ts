/*
 * @Author: Monve
 * @Date: 2022-11-22 10:09:50
 * @LastEditors: Monve
 * @LastEditTime: 2022-11-28 15:08:00
 * @FilePath: /lazada-openapi/src/reverse.ts
 */
import { ApiShopMethod, ExtraRes, Get } from "./utils/request"

type Reverse = {
  reverse_order_id: number	//Reverse order id
  trade_order_id: number	//Trade order id
  request_type: string	//The order applied by the buyer is: CANCEL; RETURN; ONLY_ REFUND
  is_rtm: boolean	//rtm:true, rtw:false
  shipping_type: string	//Shipping type
  reverse_order_lines: {
    reverse_order_line_id: number	//Reverse order line id
    trade_order_line_id: number	//Trade order line id
    reverse_status: string	//Reverse order status
    is_need_refund: string	//Is need refund
    ofc_status: string	//Ofc status
    product: {
      product_id: number	//Product id
      product_sku: string	//Product sku
    }	//Product Object
    buyer: {
      buyer_id: number	//Buyer id
    }	//Buyer Object
    trade_order_gmt_create: number	//trade order create time
    refund_amount: number	//refund amount, currency in cent, except VN (for example for SG, 100 equals SGD $1; for VN, 10000 equals VND 10000)
    reason_text: string	//reverse reason
    reason_code: number	//reverse reason code
    refund_payment_method: string	//payment method
    whqc_decision: string	//warehouse decision
    return_order_line_gmt_create: number	//reverse order line create time
    return_order_line_gmt_modified: number	//reverse order line modified time
    is_dispute: boolean	//is in dispute or not
    seller_sku_id: string	//seller sku id
    item_unit_price: number	//price, currency in cent, except VN (for example for SG, 100 equals SGD $1; for VN, 10000 equals VND 10000)
    platform_sku_id: string	//platform sku id
  }[]	//Reverse order lines list
}

type ReverseDetail = {
  reverse_order_id: number	//reverse order id
  trade_order_id: number	//trade order id
  request_type: string	//CANCEL;RETURN;ONLY_REFUND
  shipping_type: string	//PICK_UP;DROP_OFF
  is_rtm: boolean	//is Return to Merchant or not
  reverseOrderLineDTOList: {
    reverse_order_line_id: number	//reverse order line id
    trade_order_line_id: number	//trade order line id
    buyer: {
      user_id: number	//buyer user id
    }	//buyer
    reverse_status: string	//REQUEST_INITIATE;REQUEST_REJECT;REQUEST_CANCEL;CANCEL_SUCCESS
    productDTO: {
      product_id: number	//product id
      sku: string	//sku id
    }	//productDTO
    is_need_refund: boolean	//need refund or not
    ofc_status: string	//fulfillment status
    trade_order_gmt_create: number	//trade order create time
    refund_amount: number	//refund amount, currency in cent, except VN (for example for SG, 100 equals SGD $1; for VN, 10000 equals VND 10000)
    reason_text: string	//reason text
    reason_code: number	//reason code
    refund_payment_method: string	//refund payment Method
    whqc_decision: string	//warehouse decision
    return_order_line_gmt_create: number	//reverse order line create time
    return_order_line_gmt_modified: number	//reverse order line modified time
    is_dispute: boolean	//is in dispute or not
    seller_sku_id: string	//seller sku id
    item_unit_price: number	//price, currency in cent, except VN (for example for SG, 100 equals SGD $1; for VN, 10000 equals VND 10000)
    platform_sku_id: string	//platform sku id
    tracking_number: string	//tracking number
  }[]	//reverseOrderLineDTOList
}

export class ReverseApi {
  /**
   * Use this API to get the list of items for a range of reverse orders.
   */
  @Get({ url: '/reverse/getreverseordersforseller' })
  getReverseOrdersForSeller!: ApiShopMethod<
    {
      page_size: number, page_no: number,
      ofc_status_list?: string[], reverse_order_id?: number, trade_order_id?: number,
      reverse_status_list?: string[], return_to_type?: string, dispute_in_progress?: boolean,
      TradeOrderLineCreatedTimeRangeStart?: number, TradeOrderLineCreatedTimeRangeEnd?: number,
      ReverseOrderLineTimeRangeStart?: number, ReverseOrderLineTimeRangeEnd?: number,
      ReverseOrderLineModifiedTimeRangeStart?: number, ReverseOrderLineModifiedTimeRangeEnd?: number
    },
    {
      result: {
        total: number	//The total number of data
        items: Reverse[]	//Data list
        page_no: number	//Page no
        success: boolean	//Result
        page_size: number	//Page size
      }
    }
  >

  /**
   * Get the detailed information for a specific reverse order
   */
  @Get({ url: '/order/reverse/return/detail/list' })
  getReverseOrderDetail!: ApiShopMethod<
    {
      reverse_order_id: number
    }, {
      data: ReverseDetail
    }
  >

  /**
   * Seller can use this API to action on return and refund related.
   */
  @Get({ url: '/order/reverse/return/update' })
  reverseOrderReturnUpdate!: ApiShopMethod<
    {
      action: string	//instantRefund;agreeReturn;refuseReturn;agreeRefund;refuseRefund;confirmDelivery
      reverse_order_id: number	//reverse order id
      reverse_order_item_ids: number[]	//reverse order item id list
      reason_id?: number	//reason id
      comment?: string	//comment
      image_info?: {
        name: string, url: string
      }[]	//image_info
    }, {
      reverse_order_line: {
        reverse_order_line_id: number	//reverse order line id
        reason_source: string	//reason source
        reason_type: string	//reason type
        reason_id: number	//reason id
        reason_name: string	//reason name
        reason_desc: string	//reason desc
        refund_amount: number	//refund amount
        is_cancel: boolean	//cancel or not
        order_id: number	//order id
        seller_sku: string	//seller sku
        paid_price: number	//paid price
        apply_reason: string	//apply reason
        order_line_id: number	//order line id
      }[]	//reverse order line
      reverse_order_id: number	//reverse orde id
      reason_info: {
        reason_id: number	//reason id
        reason_name: string	//reason name
      }[]	//reason info
      total_refund: string	//total refund amount
    }
  >

}