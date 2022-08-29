/*
 * @Author: Monve
 * @Date: 2022-04-01 19:00:11
 * @LastEditors: Monve
 * @LastEditTime: 2022-08-29 14:16:38
 * @FilePath: /lazada-openapi/src/utils/const.ts
 */


export const BASE_URL = Object.freeze({
  sg: 'https://api.lazada.sg/rest',
  th: 'https://api.lazada.co.th/rest',
  my: 'https://api.lazada.com.my/rest',
  vn: 'https://api.lazada.vn/rest',
  ph: 'https://api.lazada.com.ph/rest',
  id: 'https://api.lazada.co.id/rest',
  auth: 'https://auth.lazada.com/rest',
})

export type BaseUrlKey = keyof (typeof BASE_URL)
