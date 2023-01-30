import request from '@/utils/request'

// 创建商品订单
export const createOrder = data => {
  return request({
    method: 'POST',
    url: '/front/order/saveOrder',
    data
  })
}

// 获取支付方式接口
export const getPayInfo = params => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayInfo',
    params
  })
}

// 创建订单（发起支付）
export const initPayment = data => {
  return request({
    method: 'POST',
    url: '/front/pay/saveOrder',
    data
  })
}

// 查询订单（查询支付结果）
// 由于接口要传递 JSON，所以进行 Headers 设置
export const getPayResult = params => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayResult',
    params
  })
}
