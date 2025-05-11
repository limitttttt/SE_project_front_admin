<template>
  <div class="resource-manage">
    <div class="header">
      <h1>教学资源管理</h1>
      <div class="search-actions">
        <el-input
          v-model="searchId"
          placeholder="请输入教室编号"
          clearable
          style="width: 200px"
        />
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="openAddDialog">添加教室</el-button>
      </div>
    </div>

    <el-card class="table-card">
      <el-table :data="filteredClassroomList" border style="width: 100%;">
        <el-table-column prop="id" label="教室编号" width="180" />
        <el-table-column prop="campus" label="校区" />
        <el-table-column prop="capacity" label="容量" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button size="small" type="primary" @click="openEditDialog(scope.row)">修改</el-button>
            <el-button size="small" type="danger" @click="deleteClassroom(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加 / 修改教室弹窗 -->
    <el-dialog v-model="dialogVisible" :title="isEditing ? '修改教室' : '添加教室'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="教室编号">
          <el-input v-model="form.id" :disabled="isEditing" />
        </el-form-item>
        <el-form-item label="校区">
          <el-input v-model="form.campus" />
        </el-form-item>
        <el-form-item label="容量">
          <el-input v-model="form.capacity" type="number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveClassroom">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

interface Classroom {
  id: string;
  campus: string;
  capacity: number;
}

const classroomList = ref<Classroom[]>([
  { id: '东二101', campus: '紫金港', capacity: 50 },
  { id: '东二202', campus: '紫金港', capacity: 80 },
]);

const dialogVisible = ref(false);
const isEditing = ref(false);
const form = ref<Classroom>({ id: '', campus: '', capacity: 0 });

// 搜索功能相关
const searchId = ref('');
const filteredClassroomList = computed(() =>
  classroomList.value.filter(c => c.id.includes(searchId.value))
);

const handleSearch = () => {
  // computed 已自动响应
};

const handleReset = () => {
  searchId.value = '';
};

// 打开添加弹窗
const openAddDialog = () => {
  isEditing.value = false;
  form.value = { id: '', campus: '', capacity: 0 };
  dialogVisible.value = true;
};

// 打开修改弹窗
const openEditDialog = (item: Classroom) => {
  isEditing.value = true;
  form.value = { ...item };
  dialogVisible.value = true;
};

// 保存教室（添加或修改）
const saveClassroom = () => {
  if (!form.value.id || !form.value.campus || !form.value.capacity) {
    ElMessage.warning('请填写完整信息');
    return;
  }
  if (isEditing.value) {
    const index = classroomList.value.findIndex(item => item.id === form.value.id);
    if (index !== -1) {
      classroomList.value[index] = { ...form.value };
      ElMessage.success('修改成功');
    }
  } else {
    const exists = classroomList.value.some(item => item.id === form.value.id);
    if (exists) {
      ElMessage.error('教室编号已存在');
      return;
    }
    classroomList.value.push({ ...form.value });
    ElMessage.success('添加成功');
  }
  dialogVisible.value = false;
};

// 删除教室
const deleteClassroom = (item: Classroom) => {
  ElMessageBox.confirm(
    `确定要删除教室 "${item.id}" 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    classroomList.value = classroomList.value.filter(c => c.id !== item.id);
    ElMessage.success('删除成功');
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};
</script>

<style scoped>
.resource-manage {
  background-color: #f5f7fa;
  min-height: calc(100vh - 100px);
  padding: 40px 60px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 10px;
  margin-bottom: 30px;
}

.search-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

h1 {
  font-size: 28px;
  font-weight: bold;
  color: #0d47a1;
  margin: 0;
}

.table-card {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.el-table th, .el-table td {
  height: 50px;
}
</style>