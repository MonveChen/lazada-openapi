/*
 * @Author: Monve
 * @Date: 2021-09-26 18:11:06
 * @LastEditors: Monve
 * @LastEditTime: 2022-04-07 18:26:39
 * @FilePath: /lazada-openapi/src/utils/request.ts
 */
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";



export const axios_service = axios.create({ timeout: 15000 })

type BaseRes = { code: string, request_id: string }

export type ApiMethod<T = any, R = any> = (
  data: T
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
      ) {
        let dic = { method, ...args }
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