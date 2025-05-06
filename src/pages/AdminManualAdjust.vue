<template>
    <div class="p-4">
      <el-card>
        <div class="mb-4 flex justify-between items-center">
          <div>
            <el-input v-model="search.course" placeholder="课程名称" class="mr-2" style="width: 200px;" />
            <el-input v-model="search.teacher" placeholder="教师名称" style="width: 200px;" />
            <el-button @click="fetchCourses" class="ml-2" type="primary">搜索</el-button>
          </div>
        </div>
        <el-table :data="filteredCourses" style="width: 100%">
          <el-table-column prop="courseName" label="课程名称" />
          <el-table-column prop="teacherName" label="教师名称" />
          <el-table-column prop="time" label="上课时间" />
          <el-table-column prop="classroom" label="教室" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="primary" @click="editCourse(row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
  
      <el-dialog title="修改课程安排" v-model="dialogVisible" width="30%">
        <el-form :model="editForm">
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
    { id: 1, courseName: '高等数学', teacherName: '张老师', time: '周一第1节', classroom: 'A101' },
    { id: 2, courseName: '计算机基础', teacherName: '李老师', time: '周二第2节', classroom: 'B203' },
    // mock 数据，可替换为接口获取
  ])
  
  const search = ref({ course: '', teacher: '' })
  const filteredCourses = computed(() =>
    courses.value.filter(c =>
      c.courseName.includes(search.value.course) && c.teacherName.includes(search.value.teacher)
    )
  )
  
  const dialogVisible = ref(false)
  const editForm = ref({ id: null, time: '', classroom: '' })
  
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
    // 若使用真实接口，这里处理搜索逻辑
  }
  </script>  