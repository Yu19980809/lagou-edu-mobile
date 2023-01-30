<template>
  <div class="section-and-lesson">
    <!-- 章节 -->
    <h2 class="section" v-text="sectionData.sectionName"></h2>
    <!-- 课时 -->
    <p
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      class="lesson"
      @click="handleClick(item)"
    >
    <!-- 课时标题 -->
    <span v-text="item.theme"></span>
    <!-- 课时图标 -->
    <van-icon v-if="item.canPlay" name="play-circle" size="20"></van-icon>
    <van-icon v-else name="lock" size="20"></van-icon>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CourseSectionAndLesson',
  props: {
    // 章节数据
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 点击播放
    handleClick (lessonInfo) {
      if (lessonInfo.canPlay) {
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-and-lesson {
  padding: 0 20px;
}
// 让课时标题与图标两端显示
.lesson {
  display: flex;
  justify-content: space-between;
}
</style>
