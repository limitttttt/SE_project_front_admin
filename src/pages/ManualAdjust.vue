<template>
  <div class="manual-adjust">
    <div class="header">
      <h1>教师申请审核</h1>
      <p class="description">以下为待处理的排课申请：</p>
    </div>

    <el-card class="table-card">
      <el-table :data="applyList" style="width: 100%" border>
        <el-table-column prop="applicant" label="申请人" width="100" />
        <el-table-column prop="course" label="课程名" />
        <el-table-column prop="class" label="学院" />
        <el-table-column prop="term" label="课程学期" />
        <el-table-column prop="time" label="原上课时间" />
        <el-table-column prop="room" label="原教室" />
        <el-table-column prop="targetTime" label="希望调整时间" />
        <el-table-column prop="targetRoom" label="希望调整教室" />
        <el-table-column prop="reason" label="申请理由" />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button size="small" type="primary" @click="openReview(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 审核弹窗 -->
    <el-dialog v-model="dialogVisible" title="审核排课申请" width="500px">
      <el-form>
        <el-form-item label="课程">
          <el-input v-model="currentItem.course" disabled />
        </el-form-item>
        <el-form-item label="课程学期">
          <el-input v-model="currentItem.term" disabled />
        </el-form-item>
        <el-form-item label="申请人">
          <el-input v-model="currentItem.applicant" disabled />
        </el-form-item>
        <el-form-item label="申请理由">
          <el-input v-model="currentItem.reason" disabled />
        </el-form-item>
        <el-form-item label="希望时间">
          <el-input v-model="currentItem.targetTime" disabled />
        </el-form-item>
        <el-form-item label="希望教室">
          <el-input v-model="currentItem.targetRoom" disabled />
        </el-form-item>
        <el-form-item label="处理意见">
          <el-input v-model="reviewComment" type="textarea" placeholder="请输入审核意见" rows="3" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" @click="handleReject">驳回</el-button>
        <el-button type="success" @click="handleApprove">通过</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

interface ApplyItem {
  applicant: string;
  course: string;
  class: string;
  term: string; // 课程学期
  time: string;
  room: string;
  reason: string;
  targetTime: string;
  targetRoom: string;
}

const applyList = ref<ApplyItem[]>([
  {
    applicant: '张老师',
    course: '数据库系统',
    class: '计算机学院',
    term: '24-25秋冬',
    time: '周二第3-4节',
    room: '东二201',
    targetTime: '周四第1-2节',
    targetRoom: '东二202',
    reason: '时间冲突'
  },
  {
    applicant: '李老师',
    course: '操作系统',
    class: '计算机学院',
    term: '24-25秋冬',
    time: '周四第1-2节',
    room: '东二202',
    targetTime: '周五第3-4节',
    targetRoom: '东二201',
    reason: '科研任务冲突'
  }
]);

const dialogVisible = ref(false);
const currentItem = ref<ApplyItem>({} as ApplyItem);
const reviewComment = ref('');

const openReview = (item: ApplyItem) => {
  currentItem.value = { ...item };
  reviewComment.value = '';
  dialogVisible.value = true;
};

const handleApprove = () => {
  ElMessage.success(`通过审核：${reviewComment.value || '无意见'}`);
  removeCurrentItem();
};

const handleReject = () => {
  ElMessage.error(`驳回审核：${reviewComment.value || '无意见'}`);
  removeCurrentItem();
};

const removeCurrentItem = () => {
  applyList.value = applyList.value.filter(item => item !== currentItem.value);
  dialogVisible.value = false;
};
</script>

<style scoped>
.manual-adjust {
  background-color: #f5f7fa;
  padding: 40px 60px;
  min-height: calc(100vh - 100px);
}

.header {
  text-align: left;
  margin-bottom: 24px;
  padding-right: 20px;
}

h1 {
  color: #0d47a1;
  font-size: 30px;
  font-weight: bold;
  margin: 0;
}

.description {
  font-size: 15px;
  color: #555;
  margin-top: 6px;
}

.table-card {
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  background-color: #ffffff;
}
</style>