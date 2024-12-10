<template>
  <div class="sleep-record-container">
    <h2>记录睡眠时间</h2>
    <VDatePicker
      v-model.range="sleepRange"
      mode="dateTime"
      :is-dark="{ selector: 'html', darkClass: 'dark' }"
    />

    <UButton color="white" variant="solid" @click="recordSleep" class="mt-4"
      >记录睡眠</UButton
    >
    <div v-if="sleepDuration" class="sleep-summary">
      <p>
        您从 <strong>{{ formattedStart }}</strong> 睡到了
        <strong>{{ formattedEnd }}</strong
        >。
      </p>
      <p>
        总共睡了
        <strong>{{ sleepDuration.hours }} 小时 {{ sleepDuration.minutes }} 分钟</strong>。
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import dayjs from "dayjs"; // 用于时间格式化

// 响应式变量：睡眠时间范围
const sleepRange = ref({
  start: new Date(),
  end: new Date(),
});

// 计算睡眠时长
const sleepDuration = computed(() => {
  if (sleepRange.value.start && sleepRange.value.end) {
    const start = dayjs(sleepRange.value.start);
    const end = dayjs(sleepRange.value.end);
    const diffMs = end.diff(start); // 获取时间差（毫秒）
    const diffMinutes = Math.floor(diffMs / (1000 * 60)); // 转换为分钟
    const hours = Math.floor(diffMinutes / 60); // 计算小时数
    const minutes = diffMinutes % 60; // 计算分钟数
    return {
      hours,
      minutes,
    };
  }
  return null;
});

// 格式化时间显示
const formattedStart = computed(() => {
  return sleepRange.value.start
    ? dayjs(sleepRange.value.start).format("YYYY-MM-DD HH:mm")
    : "";
});

const formattedEnd = computed(() => {
  return sleepRange.value.end
    ? dayjs(sleepRange.value.end).format("YYYY-MM-DD HH:mm")
    : "";
});

// 记录睡眠时间的方法
const recordSleep = () => {
  if (sleepRange.value.start && sleepRange.value.end) {
    alert(
      `睡眠时间已记录：从 ${formattedStart.value} 到 ${formattedEnd.value}，共 ${sleepDuration.value.hours} 小时 ${sleepDuration.value.minutes} 分钟`
    );
  } else {
    alert("请选择完整的时间范围！");
  }
};
</script>

<style scoped>
.sleep-record-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

UButton {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

UButton:hover {
  transform: scale(1.05);
}

.sleep-summary {
  margin-top: 20px;
  text-align: center;
  color: #555;
}

.sleep-summary p {
  margin: 5px 0;
  font-size: 16px;
}
</style>
