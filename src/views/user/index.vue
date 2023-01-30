<template>
  <div class="user">
    <!-- 顶部功能 -->
    <van-cell-group>
      <!-- 用户信息区域 -->
      <van-cell class="user-info" :border="false">
        <van-image
          width="50"
          height="50"
          round
          :src="userInfo.portrait || 'https://s0.lgstatic.com/common/image/pc/default_boy_headpic1.png'"
        />
        <div class="user-info-content">
          <h3>{{ userInfo.userName }}</h3>
          <span>
            <van-icon name="edit" />
            编辑个人资料
          </span>
        </div>
      </van-cell>
      <!-- 账户信息 -->
      <van-cell class="account-info">
        <van-grid :border="false">
          <van-grid-item>
            <span class="grid-item-value">14.05</span>
            <span>学习时长</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">200</span>
            <span>钱包/勾豆</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">1</span>
            <span>优惠券</span>
          </van-grid-item>
          <van-grid-item>
            <span class="grid-item-value">213</span>
            <span>学分</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
      <!-- 底部菜单 -->
      <van-cell icon="user-o" title="分销中心" is-link value="收益200元" />
      <van-cell icon="setting-o" title="个性化设置" is-link />
      <van-cell icon="down" title="我的下载" is-link />
      <van-cell icon="question-o" title="帮助与反馈" is-link />
      <van-cell icon="info-o" title="关于拉勾教育" is-link value="v2.0.0" />
    </van-cell-group>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter'
import { getInfo } from '@/services/user'

export default {
  name: 'User',
  components: {
    LayoutFooter
  },
  data () {
    return {
      // 存储用户信息
      userInfo: []
    }
  },
  created () {
    // 加载用户信息
    // this.loadUserInfo()
  },
  methods: {
    // 加载用户信息
    async loadUserInfo () {
      const { data } = await getInfo()
      if (data.state === 1) {
        this.userInfo = data.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 用户信息
.user-info {
  padding: 30px 20px;
  background-color: rgb(248, 150, 3)
}
// 让头像与右侧信息同行显示
.user-info .van-cell__value {
  display: flex;
}
.user-info .user-info-content {
  padding-left: 15px;
}
.user-info .user-info-content h3 {
  font-size: 18px;
  margin: 5px;
}

// 账号信息
.account-info {
  background-color: rgb(248, 150, 3);
  margin-top: -1px;
}
.account-info .van-cell__value {
  border-radius: 15px;
}
.account-info .grid-item-value {
  font-size: 22px;
  font-weight: 700;
}
</style>
