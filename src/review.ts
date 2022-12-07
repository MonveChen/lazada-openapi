/*
 * @Author: Monve
 * @Date: 2022-12-06 10:20:06
 * @LastEditors: Monve
 * @LastEditTime: 2022-12-06 19:28:26
 * @FilePath: /lazada-openapi/src/review.ts
 */
import { ApiShopMethod, Get } from "./utils/request"

export class ReviewApi {
  /**
   * Get history review id list for one seller(reviews within 3 months can be get)
   */
  @Get({ url: '/review/seller/history/list' })
  getHistoryReviewIdList!: ApiShopMethod<
    {
      item_id: string	//Product Item ID
      order_id?: number	//Order ID
      start_time: number	//Start Time, timestamp in millisecond, this is the same with "create_time" in the response data of interface (/review/seller/list/v2)；The time range cannot exceed 7 days
      end_time: number	//End Time, timestamp in millisecond, this is the same with "create_time" in the response data of interface (/review/seller/list/v2)；The time range cannot exceed 7 days
      current: number	//The current pageNo, default value = 1, max value = 50
    },
    {
      data: {
        current: number //current pageNo
        total: number //total number
        page_size: number //page size
        id_list: number[] //id list
      }
    }
  >

  /**
   * get review list by id list, need get id list first
   */
  @Get({ url: '/review/seller/list/v2' })
  getReviewListByIdList!: ApiShopMethod<
    {
      id_list: number[]	//id list, maxLength = 10
    },
    {
      data: {
        review_list: {
          submit_time: number //the time when buyer submited this review
          can_reply: boolean //if review can be replied by seller
          product_id: number //Product Item ID
          order_id: number //Order ID
          review_videos: {
            video_cover_url: string //cover image url
            video_url: string //video url
          }[] //video list
          review_content: string //review content in text
          ratings: {
            logistics_rating: number //subRatings - logistics rating
            overall_rating: number //overall rating
            seller_rating: number //subRatings - seller rating
            product_rating: number //subRatings - product rating
          } //review ratings(only PRODUCT_REVIEW has ratings, FOLLOW_UP_REVIEWS doesn't have)
          review_type: string //PRODUCT_REVIEW or FOLLOW_UP_REVIEW.
          id: number //id
          review_images: string[] //image url list
          seller_reply: string //seller reply in text
          create_time: number //the time when review data created, this is the same with "start_time" and "end_time" in the request data of interface(/review/seller/history/list)
        }[] //review list
        outdated_reviews: number[] //id list if review is not exist or won't show(outdated/rejected) any more
      }
    }
  >

  /**
   * submit seller reply for customers review
   */
  @Get({ url: '/review/seller/reply/add' })
  submitSellerReply!: ApiShopMethod<
    {
      id: number	//review id that user wants to reply to. Can be obtain from GetProductReviewList
      content: string //reply content in text, only support reply in text.max length = 500
    },
    {
      data: boolean //reply success or fail
    }
  >

}