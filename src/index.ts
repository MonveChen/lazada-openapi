/*
 * @Author: Monve
 * @Date: 2022-03-10 11:46:01
 * @LastEditors: Monve
 * @LastEditTime: 2022-11-22 10:38:01
 * @FilePath: /lazada-openapi/src/index.ts
 */

import { ChatApi } from "./chat"
import { ProductApi } from "./product"
import { BaseUrlKey, BASE_URL } from "./utils/const"
import { ApiMethod, axios_service, Post, ShopReq } from "./utils/request"
import { signRequest } from "./utils/sign"
import * as FormData from 'form-data'
import axios from "axios"
import { OrderApi } from "./order"
import { VoucherApi } from "./voucher"
import { SellerApi } from "./seller"
import { ReverseApi } from "./reverse"

interface CONFIG { app_key: string | number, app_secret: string }

type COUNTRY_USER_INFO = { country: string, seller_id: string, user_id: string, short_code: string }
interface AUTH_RES {
  access_token: string, refresh_token: string, country: string, refresh_expires_in: number,
  account_platform: string, expires_in: number, account: string,
  country_user_info: COUNTRY_USER_INFO[]
}

class LazadaOpenApi {
  private app_key: string
  private app_secret: string
  public chat = new ChatApi()
  public product = new ProductApi()
  public order = new OrderApi()
  public voucher = new VoucherApi()
  public seller = new SellerApi()
  public reverse = new ReverseApi()
  constructor() {
    axios_service.interceptors.request.use(
      (config) => {
        const baseUrl_type = config.method === 'get'
          ? config.params.baseUrl_type : config.data.baseUrl_type
        if (baseUrl_type && Object.keys(BASE_URL).includes(baseUrl_type)) {
          config.baseURL = BASE_URL[baseUrl_type as BaseUrlKey]
          config.method === 'get' ? delete config.params.baseUrl_type
            : delete config.data.baseUrl_type
        }
        const system_params = {
          app_key: this.app_key, timestamp: new Date().valueOf(),
          sign_method: 'sha256'
        }
        const data = {
          ...system_params,
          ...(config.method === 'get' ? config.params : config.data)
        }
        const sign = signRequest(this.app_secret, config.url as string, data)
        config.method === 'get' ? config.params = { ...data, sign }
          : config.data = { ...data, sign }
        return config
      },
      error => {
        console.log(error)
        Promise.reject(error)
      }
    )

    this.product.upload_image = ({ baseUrl_type, access_token, image }: { image: FormData } & ShopReq) => {
      const url = '/image/upload'
      const timestamp = Date.now()
      const data = {
        app_key: this.app_key, timestamp,
        sign_method: 'sha256', access_token
      }
      const sign = signRequest(this.app_secret, url, data)
      return axios.post(url, image, {
        baseURL: BASE_URL[baseUrl_type],
        params: { ...data, sign },
        headers: { ...image.getHeaders() }
      })
    }
  }

  setAppConfig = ({ app_key, app_secret }: CONFIG) => {
    this.app_key = app_key.toString()
    this.app_secret = app_secret
  }

  //https://open.lazada.com/doc/doc.htm?spm=a2o9m.11193535.0.0.7fd138e4SXrCtQ&nodeId=27493&docId=118729#?nodeId=10777&docId=108260

  @Post({ baseURL: BASE_URL.auth, url: '/auth/token/create' })
  token_create!: ApiMethod<{ code: string }, AUTH_RES>

  @Post({ baseURL: BASE_URL.auth, url: '/auth/token/refresh' })
  token_refresh!: ApiMethod<{ refresh_token: string }, Omit<AUTH_RES & { country_user_info_list: COUNTRY_USER_INFO[] }, 'country_user_info'>>

}

export default new LazadaOpenApi()