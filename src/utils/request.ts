/*
 * @Author: Monve
 * @Date: 2021-09-26 18:11:06
 * @LastEditors: Monve
 * @LastEditTime: 2022-08-31 16:36:24
 * @FilePath: /lazada-openapi/src/utils/request.ts
 */
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { BaseUrlKey } from "./const";



export const axios_service = axios.create()

export type ShopReq = { baseUrl_type: BaseUrlKey, access_token: string }
export type BaseRes = { code: string, request_id: string, message?: string }

export type ApiMethod<T = any, R = any> = (
  data: T,
  option?: AxiosRequestConfig<T>
) => Promise<AxiosResponse<BaseRes & R>>

export type ApiShopMethod<T = any, R = any> = (
  data: ShopReq & T,
  option?: AxiosRequestConfig<ShopReq & T>
) => Promise<AxiosResponse<BaseRes & R>>

export function createApiByMethod(method: Method) {
  return function (
    args: AxiosRequestConfig,
    format?: (res: any, data: any) => any,
    request = axios_service
  ): PropertyDecorator {
    return function (target, name) {
      target.constructor.prototype[name as string] = function (
        data = {} as any,
        option?: AxiosRequestConfig<any>
      ) {
        let dic = { method, ...args, ...option }
        method === 'get' ? dic.params = data : dic.data = data
        const result = request(dic).then((res) =>
          typeof format === 'function' ? format.call(this, res, data) : res
        )
        return result
      }
      return target
    }
  }
}

export const Get = createApiByMethod('get')
export const Post = createApiByMethod('post')

export type ExtraRes = { success: boolean, err_code: string, err_message?: string }