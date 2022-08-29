/*
 * @Author: Monve
 * @Date: 2022-08-29 14:04:27
 * @LastEditors: Monve
 * @LastEditTime: 2022-08-29 14:16:31
 * @FilePath: /lazada-openapi/src/chat.ts
 */

import { BaseUrlKey } from "./utils/const"
import { ApiMethod, ExtraRes, Get, Post } from "./utils/request"


export class ChatApi {
  //im https://www.yuque.com/docs/share/4e96d682-b1be-42a6-a67a-fbf0a7317d00?#
  //Messages

  /**
   * message_list[i].content is a json string,
   * e.g. '{\"txt\":\"你好\",\"translatText\":\"hello\"}', 
   * translatText may not exist
   */
  @Get({ url: '/im/message/list' })
  get_messages!: ApiMethod<{
    baseUrl_type: BaseUrlKey, access_token: string, session_id: string, start_time: number,
    last_message_id?: string, page_size: number
  }, ExtraRes & {
    data: {
      has_more: boolean, next_start_time: number, last_message_id: string,
      message_list: {
        message_id: string, content: string, from_account_id: string,
        from_account_type: number, send_time: number, template_id: number,
        to_account_type: number, to_account_id: string, type: number,
        process_msg: string, status: number, auto_reply: boolean, site_id: string
      }[]
    }
  }>

  /**
   * 消息模版 1 文本 3 图片  4 表情 10006 商品 10007 订单  10008 优惠券 10010 邀请关注
   * txt: template_id=1 文本消息使用 template_id=4 表情使用
   * img_url: template_id=3 图片需要传三个字段img_url, width,height
   * item_id: template_id=10006发商品消息使用
   * order_id: template_id=10007订单消息
   * promotion_id: template_id=10008优惠券消息
   */
  @Post({ url: '/im/message/send' })
  send_messages!: ApiMethod<
    {
      baseUrl_type: BaseUrlKey, access_token: string, template_id: number, session_id: string,
      txt?: string, img_url?: string, width?: number, height?: number,
      item_id?: string, order_id?: string, promotion_id?: string
    }, ExtraRes & { data: { message_id: string, template_id: number, current_time: number } }
  >

  @Post({ url: '/im/message/recall' })
  recall_messages!: ApiMethod<
    { baseUrl_type: BaseUrlKey, access_token: string, session_id: string, message_id: string },
    ExtraRes
  >

  /**
   * site_id e.g. 'SG'
   */
  @Get({ url: '/im/session/list' })
  get_session_list!: ApiMethod<
    { baseUrl_type: BaseUrlKey, access_token: string, start_time: number, last_session_id?: string, page_size: number },
    ExtraRes & {
      data: {
        has_more: boolean, next_start_time: number, last_session_id: string,
        session_list: {
          session_id: string, summary: string, title: string,
          head_url: string, last_message_id: string, last_message_time: number,
          buyer_id: number, unread_count: number, self_position: number,
          to_position: number, tags: string[], site_id: string,
        }[]
      }
    }
  >

  @Get({ url: '/im/session/get' })
  get_session!: ApiMethod<
    { baseUrl_type: BaseUrlKey, access_token: string, session_id: string },
    ExtraRes & {
      data: {
        session_id: string, content: string, title: string,
        head_url: string, last_message_id: string, last_message_time: number,
        buyer_id: number, unread_count: number, self_position: number,
        to_position: number, tags: string[], site_id: string,
      }
    }
  >

  @Post({ url: '/im/session/read' })
  set_session_read!: ApiMethod<
    { baseUrl_type: BaseUrlKey, access_token: string, session_id: string, last_read_message_id: string },
    ExtraRes
  >

}