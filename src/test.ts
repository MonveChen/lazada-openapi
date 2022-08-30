/*
 * @Author: Monve
 * @Date: 2022-04-08 10:52:47
 * @LastEditors: Monve
 * @LastEditTime: 2022-08-30 16:07:09
 * @FilePath: /lazada-openapi/src/test.ts
 */

import lazada from "./index"

const main = async () => {
  if (!process.env.APP_KEY || !process.env.APP_SECRET) {
    throw new Error("env value APP_KEY or APP_SECRET not found");

  }

  lazada.setAppConfig({ app_key: process.env.APP_KEY, app_secret: process.env.APP_SECRET })

  // //授权
  // const res = await lazada.token_create({ code: '0_108334_ze36fSDB7itshb9ZZpjpx9TN977' }, { timeout: 30000 })
  // console.log(res.data.access_token)

  // // 获取会话列表
  const access_token = '50000701543blrwdjPExQhfjFShKsVlohOl1Dsv9FXnQvjtPXIZHyfS130bcf87r'
  // const res2 = await lazada.chat.get_session_list({
  //   access_token, baseUrl_type: 'th',
  //   start_time: new Date().valueOf(), page_size: 20
  // })
  // console.log(JSON.stringify(res2.data))
  // const res3 = await lazada.chat.get_session({
  //   baseUrl_type: 'th', access_token, session_id: '100191276347_2_100208742287_1_103'
  // })
  // console.log(JSON.stringify(res3.data))
  // const res4 = await lazada.set_session_read({
  //   baseUrl_type: 'th', access_token, session_id: '100191276347_2_100208742287_1_103',
  //   last_read_message_id: '2vzWIi80BtRir61331'
  // })
  // console.log(JSON.stringify(res4.data))
  // const res5 = await lazada.recall_messages({
  //   baseUrl_type: 'th', access_token, session_id: '100191276347_2_100208742287_1_103',
  //   message_id: '2vzWIi80BtRir61331'
  // })
  // console.log(JSON.stringify(res5.data))

  const res6 = await lazada.chat.get_messages({
    baseUrl_type: 'th', access_token, session_id: '100191276347_2_100208742287_1_103',
    last_message_id: '2vzWIi80BtRir61331', start_time: new Date().valueOf(), page_size: 20
  })
  console.log(JSON.stringify(res6.data))

  // const res7 = await lazada.send_messages({
  //   baseUrl_type: 'th', access_token, session_id: '100191276347_2_100208742287_1_103',
  //   template_id: 1, txt: 'test222'
  // })
  // console.log(JSON.stringify(res7.data))
}

main()