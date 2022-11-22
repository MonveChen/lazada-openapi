/*
 * @Author: Monve
 * @Date: 2022-09-20 09:49:01
 * @LastEditors: Monve
 * @LastEditTime: 2022-09-20 09:53:41
 * @FilePath: /lazada-openapi/src/seller.ts
 */
import { ApiShopMethod, ExtraRes, Get } from "./utils/request"

export type Seller = {
  name_company: string    //Company name
  seller_id: number    //Seller's ID
  name: string    //Shop name
  short_code: string    //Seller's short code
  logo_url: string    //Logo URL
  email: string    //Seller's email
  cb: boolean    //Whether the seller is a Cross Border seller or not
  location: string    //location of seller
  status: string    //three status ACTIVE INACTIVE DELETED
  verified: boolean    //Whether the seller is verified
}

export class SellerApi {
  /**
   * get a seller voucher promotion detail
   */
  @Get({ url: '/seller/get' })
  get_seller!: ApiShopMethod<
    {},
    ExtraRes & {
      data: Seller
    }
  >
}