<template>
  <div class="result-query">
    <div class="header">
      <h1>排课结果查询</h1>
    </div>

    <!-- 搜索区域 -->
    <el-form :inline="true" class="search-form">
      <el-form-item label="教师名">
        <el-input v-model="search.teacher" placeholder="请输入教师名" clearable />
      </el-form-item>
      <el-form-item label="教室名">
        <el-input v-model="search.room" placeholder="请输入教室名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="success" @click="handlePrint" style="margin-left: 20px">打印课表</el-button>
      </el-form-item>
    </el-form>

    <!-- 普通表格展示（未搜索状态） -->
    <el-table
      v-if="!search.teacher && !search.room"
      :data="resultList"
      style="width: 100%; margin-top: 20px;"
      border
    >
      <el-table-column prop="course" label="课程名" />
      <el-table-column prop="class" label="学院" />
      <el-table-column prop="time" label="上课时间" />
      <el-table-column prop="room" label="教室" />
      <el-table-column prop="teacher" label="教师" />
    </el-table>

    <!-- 课表展示（有搜索关键词时） -->
    <div v-else id="print-area">
      <table class="schedule-table">
        <thead>
          <tr>
            <th>时间 / 星期</th>
            <th v-for="day in weekDays" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slot in timeSlots" :key="slot">
            <td class="slot-label">{{ slot }}</td>
            <td v-for="day in weekDays" :key="day" class="slot-cell">
              <div v-if="getCourseAt(day, slot)">
                <div class="course-name">{{ getCourseAt(day, slot)?.course }}</div>
                <div class="course-info">
                  {{ isTeacherView ? getCourseAt(day, slot)?.room : getCourseAt(day, slot)?.teacher }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

interface ScheduleResult {
  course: string;
  class: string;
  time: string;
  room: string;
  teacher: string;
}

// 模拟数据
const resultList = ref<ScheduleResult[]>([
  { course: '数据库系统', class: '计算机学院', time: '周二第3-4节', room: '东二201', teacher: '张老师' },
  { course: '操作系统', class: '计算机学院', time: '周四第1-2节', room: '东二202', teacher: '李老师' },
  { course: '数据结构基础', class: '计算机学院', time: '周三第5-6节', room: '东一101', teacher: '王老师' },
]);

// 搜索项
const search = ref({ teacher: '', room: '' });

// 搜索（可留空）
const handleSearch = () => {};

// 重置搜索
const handleReset = () => {
  search.value.teacher = '';
  search.value.room = '';
};

// 打印课表
const handlePrint = () => {
  if (!search.value.teacher && !search.value.room) {
    ElMessage.warning('请先输入教师名或教室名后再打印课表');
    return;
  }
  window.print();
};

// 过滤结果
const filteredResults = computed(() => {
  return resultList.value.filter(item => {
    const matchTeacher = item.teacher.includes(search.value.teacher);
    const matchRoom = item.room.includes(search.value.room);
    return matchTeacher && matchRoom;
  });
});

// 课表数据结构
const weekDays = ['周一', '周二', '周三', '周四', '周五'];
const timeSlots = ['第1-2节', '第3-4节', '第5-6节'];

// 当前视图类型
const isTeacherView = computed(() => !!search.value.teacher);

// 获取指定格子的课程
const getCourseAt = (day: string, slot: string) => {
  return filteredResults.value.find(item => item.time.includes(day) && item.time.includes(slot));
};
</script>

<style scoped>
.result-query {
  background-color: #f8f9fa;
  padding: 30px 40px 40px;
  border-radius: 8px;
}

.header {
  text-align: left;
  margin-bottom: 16px;
  padding-left: 4px;
}

h1 {
  font-size: 30px;
  font-weight: 600;
  color: #0d47a1;
  margin: 0;
}

.search-form {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}
.schedule-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  table-layout: fixed;
}
.schedule-table th,
.schedule-table td {
  border: 1px solid #ddd;
  padding: 12px;
}
.slot-label {
  background-color: #f0f0f0;
  font-weight: bold;
  width: 100px;
}
.course-name {
  font-weight: bold;
  color: #0d47a1;
}
.course-info {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.el-table {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: white;
}

.el-table th {
  background-color: #0d47a1 !important;
  color: white !important;
  font-weight: bold;
  font-size: 14px;
}

.el-table td {
  font-size: 14px;
  color: #333;
}

.el-table__row:hover {
  background-color: #f0f4ff !important;
}

</style>

<style>
@media print {
  body * {
    visibility: hidden;
  }

  #print-area, #print-area * {
    visibility: visible;
  }

  #print-area {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    max-width: 90%;
    text-align: center;
  }

  .search-form {
    display: none !important;
  }

  .schedule-table {
    font-size: 12pt;
    margin: 0 auto;
  }

  .schedule-table td,
  .schedule-table th {
    padding: 8px;
  }
}
</style>