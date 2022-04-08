/*
 * @Author: Monve
 * @Date: 2022-04-02 11:40:43
 * @LastEditors: Monve
 * @LastEditTime: 2022-04-02 14:15:08
 * @FilePath: /lazada-openapi/src/utils/sign.ts
 */
import * as crypto from 'crypto'

export const signRequest = (
  app_secret: string,
  apiPath: string,
  params: { [key: string]: string | number },
): string => {
  const keysortParams = Object.keys(params)
    .sort()
    .reduce((ordered: { [key: string]: string | number }, key) => {
      ordered[key] = params[key]
      return ordered
    }, {})

  const concatString = Object.keys(keysortParams).reduce(
    (concatString, key) => concatString.concat(key + keysortParams[key]),
    '',
  )

  const preSignString = apiPath + concatString

  const hash = crypto
    .createHmac('sha256', app_secret)
    .update(preSignString)
    .digest('hex')

  return hash.toUpperCase()
}