<template>
  <div class="teacher-request">
    <el-card>
      <h2>我的课程</h2>
      <el-table :data="myCourses" style="width: 100%">
        <el-table-column prop="courseId" label="课程编号" width="120" />
        <el-table-column prop="courseName" label="课程名称" />
        <el-table-column prop="class" label="学院" />
        <el-table-column prop="term" label="课程学期" />
        <el-table-column prop="time" label="原时间" />
        <el-table-column prop="room" label="原教室" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="openDialog(scope.row)">
              申请调整
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="申请课程调整" width="500px">
      <el-form :model="form">
        <el-form-item label="课程编号">
          <el-input v-model="form.courseId" disabled />
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="form.courseName" disabled />
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="form.class" disabled />
        </el-form-item>
        <el-form-item label="课程学期">
          <el-input v-model="form.term" disabled />
        </el-form-item>
        <el-form-item label="调整原因">
          <el-input type="textarea" v-model="form.reason" placeholder="请输入调整原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRequest">提交申请</el-button>
      </template>
    </el-dialog>

    <el-card style="margin-top: 30px;">
      <h2>我的申请记录</h2>
      <el-table :data="history" style="width: 100%">
        <el-table-column prop="courseId" label="课程编号" width="120" />
        <el-table-column prop="courseName" label="课程名称" />
        <el-table-column prop="class" label="学院" />
        <el-table-column prop="term" label="课程学期" />
        <el-table-column prop="reason" label="申请原因" />
        <el-table-column prop="status" label="审核状态" />
        <el-table-column prop="adjustedTime" label="调整后时间" />
        <el-table-column prop="adjustedRoom" label="调整后教室" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const myCourses = ref([
  {
    courseId: 'CS001',
    courseName: '数据库系统',
    class: '计算机学院',
    term: '24-25秋冬',
    time: '周一第3-4节',
    room: '东一301'
  },
  {
    courseId: 'CS002',
    courseName: '操作系统',
    class: '计算机学院',
    term: '24-25秋冬',
    time: '周四第1-2节',
    room: '东二101'
  }
])

const history = ref([
  {
    courseId: 'CS001',
    courseName: '数据库系统',
    class: '计算机学院',
    term: '24-25秋冬',
    reason: '时间冲突',
    status: '审核通过',
    adjustedTime: '周三第3-4节',
    adjustedRoom: '东一201'
  },
  {
    courseId: 'CS002',
    courseName: '操作系统',
    class: '计算机学院',
    term: '24-25秋冬',
    reason: '希望换到下午',
    status: '待审核',
    adjustedTime: '',
    adjustedRoom: ''
  }
])

const dialogVisible = ref(false)
const form = ref({
  courseId: '',
  courseName: '',
  class: '',
  term: '',
  reason: ''
})

function openDialog(course) {
  form.value.courseId = course.courseId
  form.value.courseName = course.courseName
  form.value.class = course.class
  form.value.term = course.term
  form.value.reason = ''
  dialogVisible.value = true
}

function submitRequest() {
  history.value.unshift({
    courseId: form.value.courseId,
    courseName: form.value.courseName,
    class: form.value.class,
    term: form.value.term,
    reason: form.value.reason,
    status: '待审核',
    adjustedTime: '',
    adjustedRoom: ''
  })
  dialogVisible.value = false
}
</script>

<style scoped>
.teacher-request {
  padding: 20px;
}
</style>
