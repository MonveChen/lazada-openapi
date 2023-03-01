/*
 * @Author: Monve
 * @Date: 2023-03-01 15:11:52
 * @LastEditors: Monve
 * @LastEditTime: 2023-03-01 15:53:25
 * @FilePath: /lazada-openapi/src/logistic.ts
 */
import { ApiShopMethod, Get } from "./utils/request"

export class LogisticApi {
  /**
   * Query logistic detail for seller erp with seller id, order id and locale info. This api is only available in the state after ready to ship.
   */
  @Get({ url: '/logistic/order/trace' })
  getOrderTrace!: ApiShopMethod<
    {
      order_id: string	//Order ID
      locale?: string	//local
      ofcPackageIdList?: string[]	//package id list
    },
    {
      result: {
        error_code: {
          displayMessage: string//displayMessage
        }
        repeated: boolean//Repeated
        retry: boolean//Retry
        not_success: boolean//Not success
        success: boolean//Success
        module: {
          warehouse_detail_info: string//Warehouse detail info
          ofc_order_id: string//ofc order id
          package_detail_info_list: {
            order_line_info_list: string//Order line info list
            tracking_number: string//Tracking number
            ofc_package_id: string//ofc package id
            logistic_detail_info_list: {
              package_location_name: string//Package location name
              event_date: string//Event date
              detail_type: string//Detail stauts type
              proof_images: Object[]//Proof images
              receive_time: number//Receive time
              status_code: string//Status code
              icon: string//icon
              event_time: number//Event time
              description: string//Description of status
              title: string//title of status
            }[]
          }[]
        }[]
      }
    }
  >

}