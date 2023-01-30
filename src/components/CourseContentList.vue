<template>
  <div class="course-content-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <!-- List 列表组件 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          @click="$router.push({
            name: 'course-info',
            params: {
              courseId: item.id
            }
          })"
        >
          <!-- 左侧课程图片 -->
          <div>
            <img :src="item.courseImgUrl || item.image">
          </div>
          <!-- 右侧课程详细信息 -->
          <div class="course-info">
            <!-- 课程名 -->
            <h3 v-text="item.courseName || item.name"></h3>
            <!-- 简介 -->
            <p class="course-preview" v-html="item.previewFirstField"></p>
            <!-- 如果为已购课程，无需显示价格区域 -->
            <!-- 价格 -->
            <p v-if="item.price" class="price-container">
              <!-- 折扣价 -->
              <span class="course-discounts">￥{{ item.discounts }}</span>
              <!-- 原价 -->
              <s class="course-price">￥{{ item.price }}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'CourseContentList',
  props: {
    // 用于请求数据的函数
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      // 数据列表
      list: [],
      // 加载状态
      loading: false,
      // 是否加载完毕
      finished: false,
      // 数据页数
      currentPage: 1,
      // 下拉刷新状态
      isRefreshing: false
    }
  },
  methods: {
    // 课程列表数据加载
    async onLoad () {
      // 加载状态开启
      this.loading = true
      // 发送请求，请求上架课程信息
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        // 代表上架课程
        status: 1
      })
      // 检测，如果没有数据了就结束，如果有就保存
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      // 修改页数，用于下次请求下一页
      this.currentPage++
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    },
    // 下拉刷新操作
    async onRefresh () {
      // 还原数据页数为第一页
      this.currentPage = 1
      // 重新发送请求
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10
      })
      // 下拉刷新，需要清除所有数据，然后直接给 this,list 赋值
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list = data.content
      }
      // 信息提示
      this.$toast('刷新成功')
      // 关闭下拉提示框
      this.isRefreshing = false
    }
  }
}
</script>

<style lang="scss" scoped>
// 列表组件的固定滚动设置
.course-content-list {
  position: fixed;
  left: 0;
  right: 0;
  // top 和 bottom 的值设置在父组件 CourseContent 中
  top: 0;
  bottom: 0;
  overflow-y: auto;
}
// 课程条目设置 flex,内部元素左右显示
.van-cell__value {
  display: flex;
  height: 100px;
  padding: 10px 0;
}
// 左侧图设置固定尺寸
.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}
// 右侧内容区域 flex: 1 撑满父元素
.course-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 10px;
}
.course-info .course-preview {
  flex-grow: 1;
}
.course-info .course-discounts {
  color: #ff7452;
  margin-right: 10px;
}
p, h3 {
  margin: 0;
}
</style>
