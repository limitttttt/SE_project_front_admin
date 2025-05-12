<template>
  <div class="manual-adjust">
    <div class="header">
      <h1>管理员手动调整</h1>
    </div>

    <!-- 搜索区域 -->
    <el-form :inline="true" class="search-form">
      <el-form-item label="课程名称">
        <el-input v-model="search.course" placeholder="请输入课程名称" clearable />
      </el-form-item>
      <el-form-item label="教师名称">
        <el-input v-model="search.teacher" placeholder="请输入教师名称" clearable />
      </el-form-item>
      <el-form-item label="课程学期">
        <el-select v-model="search.term" placeholder="请选择学期" clearable style="width: 180px;">
          <el-option label="24-25秋冬" value="24-25秋冬" />
          <el-option label="24-25春夏" value="24-25春夏" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchCourses">搜索</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格展示 -->
    <el-table :data="filteredCourses" style="width: 100%; margin-top: 20px;" border>
      <el-table-column prop="courseId" label="课程编号" width="120" /> <!-- ✅ 新增 -->
      <el-table-column prop="courseName" label="课程名称" />
      <el-table-column prop="teacherName" label="教师名称" />
      <el-table-column prop="college" label="学院" />
      <el-table-column prop="term" label="课程学期" />
      <el-table-column prop="time" label="上课时间" />
      <el-table-column prop="classroom" label="教室" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="primary" @click="editCourse(row)" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog title="修改课程安排" v-model="dialogVisible" width="30%">
      <el-form :model="editForm">
        <el-form-item label="课程编号">
          <el-input v-model="editForm.courseId" disabled />
        </el-form-item>
        <el-form-item label="上课时间">
          <el-input v-model="editForm.time" />
        </el-form-item>
        <el-form-item label="教室">
          <el-input v-model="editForm.classroom" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const courses = ref([
  {
    id: 1,
    courseId: 'CS101',
    courseName: '离散数学',
    teacherName: '张老师',
    college: '计算机学院',
    term: '24-25秋冬',
    time: '周一第1-2节',
    classroom: '东一101'
  },
  {
    id: 2,
    courseId: 'CS102',
    courseName: '计算机基础',
    teacherName: '李老师',
    college: '计算机学院',
    term: '24-25秋冬',
    time: '周二第3-4节',
    classroom: '东二203'
  }
])

const search = ref({ course: '', teacher: '', term: '' })

const filteredCourses = computed(() =>
  courses.value.filter(c =>
    c.courseName.includes(search.value.course) &&
    c.teacherName.includes(search.value.teacher) &&
    (!search.value.term || c.term === search.value.term)
  )
)

const dialogVisible = ref(false)
const editForm = ref({ id: null, courseId: '', time: '', classroom: '' })

function editCourse(course) {
  editForm.value = { ...course }
  dialogVisible.value = true
}

function saveEdit() {
  const index = courses.value.findIndex(c => c.id === editForm.value.id)
  if (index !== -1) {
    courses.value[index] = { ...editForm.value }
  }
  dialogVisible.value = false
}

function fetchCourses() {
  // 筛选由 computed 实现，无需重复逻辑
}

function resetSearch() {
  search.value.course = ''
  search.value.teacher = ''
  search.value.term = ''
}
</script>

<style scoped>
.manual-adjust {
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
  font-size: 28px;
  font-weight: 600;
  color: #0d47a1;
  margin: 0;
}

.search-form {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
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