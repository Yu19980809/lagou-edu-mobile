<template>
  <div class="layout-footer">
    <!-- Tabbar 标签栏组件 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">选课</van-tabbar-item>
      <van-tabbar-item replace to="/learn" icon="desktop-o">学习</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>
