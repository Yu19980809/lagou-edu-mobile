<template>
  <div class="pay">
    <van-cell-group>
      <!-- 课程信息 -->
      <van-cell class="course-info">
        <!-- 左侧课程封面 -->
        <img :src="course.courseImgUrl">
        <!-- 右侧课程信息 -->
        <div class="price-info">
          <div class="course-name" v-text="course.courseName"></div>
          <div class="discounts">￥{{ course.discounts }}</div>
        </div>
      </van-cell>
      <!-- 账户信息 -->
      <van-cell class="account-info">
        <div>购买信息</div>
        <div>购买课程后使用此账号登录 [拉勾教育] 学习课程</div>
        <div class="username">当前账号：{{ username }}</div>
      </van-cell>
      <!-- 支付方式 -->
      <van-cell class="pay-channel">
        <div>
          <p>支付方式</p>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell @click="radio = payInfo[1].channelCode">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png">
                  <span>微信支付</span>
                </template>
                <template #right-icon>
                  <van-radio :name="1"></van-radio>
                </template>
              </van-cell>
              <van-cell clickable @click="radio = payInfo[0].channelCode">
                <template #title>
                  <img src="http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png">
                  <span>支付宝支付</span>
                </template>
                <template #right-icon>
                  <van-radio :name="2"></van-radio>
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <van-button @click="handlePay">￥{{ course.discounts }} 立即支付</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getCourseById } from '@/services/course'
import { createOrder, getPayInfo, initPayment, getPayResult } from '@/services/pay'

export default {
  name: 'Pay',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {},
      // 支付方式
      radio: 1,
      // 订单号
      orderNo: null,
      // 支付方式信息
      payInfo: {}
    }
  },
  created () {
    // 加载课程信息
    this.loadCourse()
    // 处理订单信息
    // this.loadOrder()
  },
  methods: {
    // 加载课程信息
    async loadCourse () {
      const { data } = await getCourseById({
        courseId: this.courseId
      })
      console.log(data)
      if (data.state === 1) {
        this.course = data.content
      }
    },
    // 处理订单信息
    async loadOrder () {
      // 创建订单，获取订单号
      const { data } = await createOrder({
        goodsId: this.courseId
      })
      if (data.state === 1) {
        this.orderNo = data.content.orderNo
      }
      // 获取支付方式
      const { data: payInfo } = await getPayInfo({
        shopOrderNo: this.orderNo
      })
      this.payInfo = payInfo.content.supportChannels
    },
    // 支付按钮点击事件
    async handlePay () {
      // 发起支付请求
      const { data } = await initPayment({
        goodsOrderNo: this.orderNo,
        channel: this.radio === 1 ? 'weChat' : 'aliPay',
        returnUrl: 'http://edufront.lagounews.com'
      })
      // 接收响应地址，并跳转(会跳转到微信支付或者支付宝支付的页面)
      window.location.href = data.content.payUrl
      // 发起支付请求后，查询支付结果（每秒查询一次）
      const timer = setInterval(async () => {
        const { data: payResult } = await getPayResult({
          orderNo: data.content.orderNo
        })
        // 如果支付成功，则清除掉定时器，并跳转回学习页
        if (payResult.content && payResult.content.status === 2) {
          clearInterval(timer)
          this.$toast.success('购买成功')
          this.$router.push({
            name: 'learn'
          })
        }
      }, 1000)
    }
  },
  computed: {
    username () {
      return this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }
}
</script>

<style lang="scss" scoped>
// 让容器撑满整个页面
.pay {
  position: absolute;
  width: 100%;
  height: 100%
}
// 单元格容器
.van-cell-group {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}
.couse-info {
  height: 170px;
  padding: 40px 20px 0;
  margin-bottom: 10px;
}
// 让图片与右侧信息同行展示
.course-info .van-cell__value {
  display: flex;
}
.course-info img {
  width: 80px;
  height: 107px;
  border-radius: 10px;
}
.price-info {
  height: 107px;
  padding: 5px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price-info .course-name {
  font-size: 16px;
}
.price-info .discounts {
  font-size: 22px;
  font-weight: 700;
  color: #ff7452;
}
.account-info {
  height: 120px;
  margin-bottom: 10px;
}
.account-info div:nth-child(2) {
  font-size: 12px;
  color: #999;
}
.account-info .username {
  margin: 20px 0 10px;
  font-size: 16px;
}

// 支付区域
.pay-channel {
  flex: 1;
}
.pay-channel .van-cell__value {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pay-channel .van-cell {
  padding: 20px 10px;
}
.pay-channel .van-cell__title {
  display: flex;
  align-items: center;
}
.pay-channel .van-cell img {
  width: 28px;
  height: 28px;
}
.pay-channel .van-cell span {
  font-size: 16px;
  margin-left: 10px;
}
::v-deep .van-radio__icon--checked .van-icon {
  background-color: #fbc546;
  border-color: #fbc546;
}
.pay-channel .van-button {
  background: linear-gradient(270deg, #faa83e, #fbc546);
  border-radius: 20px;
  margin-bottom: 5px;
  font-size: 18px;
}
</style>
