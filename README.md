# lazada-openapi

A lazada openapi sdk, currently there is only sdk about im part

#### Usage

```typescript
import "base-class-fuction-extend" //import it first

lazada.setAppConfig({ app_key: 108334, app_secret: "ZKpigRItsXvnImXfLzuKliOTByAOUhsZ" })

//授权
const res = await lazada.token_create({ code: '0_108334_gr0GkF1EuYdpvrIbqAD6pU7J5318' })
console.log(res.data.access_token)

// 获取会话列表
const access_token = '50000601317sMk1gvHhri0OdBgbUg18cf3b17luyEHkRmvmrtEDXBtxFuGZ3Bv0z'
const res2 = await lazada.get_session_list({
  access_token, baseUrl_type: 'th',
  start_time: new Date().valueOf(), page_size: 20
})
```



##### 更多例子：

https://github.com/MonveChen/lazada-openapi/blob/main/src/test.ts



##### 官方接口文档：

https://www.yuque.com/docs/share/4e96d682-b1be-42a6-a67a-fbf0a7317d00?#



目前仅有im相关的接口，希望更多的人加入([如何加入](https://www.zhihu.com/question/39721968?from=profile_question_card))，一起为该开源sdk做出贡献([源码](https://www.zhihu.com/question/39721968?from=profile_question_card))



该项目由typescript编写，新接口参照[原有装饰器编写的接口](https://github.com/MonveChen/lazada-openapi/blob/main/src/index.ts)填充即可，

e.g.

```typescript
@Post({ url: '/im/message/send' })
  send_messages!: ApiMethod<
    {
      baseUrl_type: BASEURL_TYPE, access_token: string, template_id: number, session_id: string,
      txt?: string, img_url?: string, width?: number, height?: number,
      item_id?: string, order_id?: string, promotion_id?: string
    }, ExtraRes & { data: { message_id: string, template_id: number, current_time: number } }
  >
```

