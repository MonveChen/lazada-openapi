/*
 * @Author: Monve
 * @Date: 2022-08-31 14:19:49
 * @LastEditors: Monve
 * @LastEditTime: 2022-08-31 15:17:37
 * @FilePath: /lazada-openapi/src/product.ts
 */
import { AxiosResponse } from "axios"
import { ShopReq } from "./utils/request"
import * as FormData from 'form-data'


export class ProductApi {
  /**
   * Description:Use this API to upload a single image file to Lazada site. Allowed image formats are JPG and PNG. The maximum size of an image file is 1MB.
   */
  upload_image: (data: { image: FormData } & ShopReq) => Promise<AxiosResponse<{
    code: string,
    data: {
      image: {
        url: string, hash_code: string
      }
    }
  }>>;
}