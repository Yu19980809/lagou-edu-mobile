<template>
  <div class="login">
    <!-- NavBar 组件 -->
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- Form 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写用户名' },
          { validator: phoneCheck, message: '格式有误，请重新输入' }
        ]"
      />
      <van-field
        v-model="form.password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { validator: passwordCheck, message: '密码错误，请重新输入' }
        ]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" :loading="isLoading">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/services/user'

export default {
  name: 'Login',
  data () {
    return {
      // 表单数据
      form: {
        phone: '',
        password: ''
      },
      // 登录按钮加载状态
      isLoading: false
    }
  },
  methods: {
    // 返回
    onClickLeft () {
      // go() 用于跳转历史， -1 表示后退一个页面
      this.$router.go(-1)
    },
    // 登录
    async onSubmit () {
      this.isLoading = true
      const { data } = await login(this.form)
      if (data.state === 1) {
        this.$toast.success('登录成功')
        // 保存用户数据
        this.$store.commit('setUser', data.content)
        // 跳转(跳转到上次访问的页面，若无，则默认跳转到 course 页面)
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        this.$toast.fail('登录失败')
      }
      this.isLoading = false
    },
    // 手机号检验
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    },
    // 密码校验
    passwordCheck (value) {
      return /^[a-zA-Z0-9]{6,12}$/.test(value)
    }
  }
}
</script>
