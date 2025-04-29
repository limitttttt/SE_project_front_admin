<template>
  <div class="auto-schedule">
    <div class="schedule-card">
      <h1>自动排课</h1>
      <p class="schedule-time">最后一次自动排课时间：{{ lastScheduleTime }}</p>
      <el-button
        type="primary"
        size="large"
        :loading="loading"
        @click="handleAutoSchedule"
        class="schedule-btn"
      >
        {{ loading ? '排课中...' : '一键自动排课' }}
      </el-button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

// 模拟排课时间
const lastScheduleTime = ref('暂无排课记录');
const loading = ref(false);

// 模拟调后端接口
const handleAutoSchedule = () => {
  loading.value = true;
  setTimeout(() => {
    const now = new Date();
    lastScheduleTime.value = now.toLocaleString();
    loading.value = false;
    alert('排课成功！');
  }, 1500);
};
</script>
  
<style scoped>
.auto-schedule {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center; /* ⭐ 居中页面 */
  background-color: #f5f7fa;
  padding: 40px;
}

/* 内容块，卡片式设计 */
.schedule-card {
  background: white;
  padding: 50px 60px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  width: 480px;
}

/* 标题 */
h1 {
  color: #0d47a1;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 时间文本 */
.schedule-time {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

/* 按钮特效 */
.schedule-btn {
  width: 100%;
  font-size: 18px;
  height: 50px;
  border-radius: 8px;
}

.schedule-btn:hover {
  background-color: #1565c0;
}
</style>