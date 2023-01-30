<template>
  <div class="learn">
    <!-- 顶部功能 -->
    <van-nav-bar title="已购课程" />
    <course-content-list
      :fetchData="fetchData"
    >
    </course-content-list>
    <!-- 底部导航 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter'
import CourseContentList from '@/components/CourseContentList'
import { getPurchaseCourse } from '@/services/course'

export default {
  name: 'Learn',
  components: {
    LayoutFooter,
    CourseContentList
  },
  data () {
    return {
      // 课程信息
      courseList: []
    }
  },
  methods: {
    fetchData () {
      return getPurchaseCourse()
    }
  }
}
</script>

<style lang="scss" scoped>
// 设置顶部与底部位置
.course-content-list {
  top: 50px;
  bottom: 50px;
}
</style>
