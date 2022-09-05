/*
 * @Author: Monve
 * @Date: 2022-08-31 14:19:49
 * @LastEditors: Monve
 * @LastEditTime: 2022-09-05 15:08:16
 * @FilePath: /lazada-openapi/src/product.ts
 */
import { AxiosResponse } from "axios"
import { ApiShopMethod, BaseRes, ExtraRes, Get, ShopReq } from "./utils/request"
import * as FormData from 'form-data'


export class ProductApi {
  /**
   * Description:Use this API to upload a single image file to Lazada site. Allowed image formats are JPG and PNG. The maximum size of an image file is 1MB.
   */
  upload_image: (data: { image: FormData } & ShopReq) => Promise<AxiosResponse<{
    data: {
      image: {
        url: string, hash_code: string
      }
    }
  } & BaseRes>>;


  /**
   * Use this API to get detailed information of the specified products.
   * @param limit The number of Items you would like to fetch from every response,The maximum is 50.
   */
  @Get({ url: '/products/get' })
  get_products!: ApiShopMethod<
    {
      filter?: string, update_before?: string, create_before?: string, offset?: string,
      create_after?: string, update_after?: string, limit?: string, options?: string,
      sku_seller_list?: string
    },
    ExtraRes & {
      data: {
        total_products: string, products: {
          primary_category: number,
          attributes: object,
          skus: object[],
          item_id: number,
          created_time: string,
          updated_time: string,
          images: string,
          marketImages: string,
          status: string,
          subStatus: string,
          suspendedSkus: object[],
          trialProduct: boolean,
          rejectReason: object[]
        }[]
      }
    }
  >
}
