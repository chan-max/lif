<template>
  <a-form class="space-y-6" size="large" labelAlign="left" :colon="false">
    <a-form-item>
      <template #label>
        <div class="label">睡眠时间</div>
      </template>
      <a-range-picker
        v-model:value="range"
        style="width: 100%"
        size="large"
        :placeholder="['睡眠开始时间', '睡眠结束时间']"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
        :presets="timePresets"
        @calendarChange="calendarChange"
      >
        <!-- Render extra footer with multiple custom buttons -->
        <template #renderExtraFooter>
          <div class="button-group">
            <a-button @click="setToTime(0)" size="small" type="link">今天 00:00</a-button>
            <a-button @click="setToTime(1)" size="small" type="link">今天 01:00</a-button>
            <a-button @click="setToTime(2)" size="small" type="link">今天 02:00</a-button>
            <a-button @click="setToTime(5)" size="small" type="link">今天 05:00</a-button>
            <a-button @click="setToTime(6)" size="small" type="link">今天 06:00</a-button>
            <a-button @click="setToTime(7)" size="small" type="link">今天 07:00</a-button>
            <a-button @click="setToTime(8)" size="small" type="link">今天 08:00</a-button>
            <a-button @click="setToTime(9)" size="small" type="link">今天 09:00</a-button>
            <a-button @click="setToTime(10)" size="small" type="link"
              >今天 10:00</a-button
            >
            <a-button @click="setToTime(11)" size="small" type="link"
              >今天 11:00</a-button
            >
            <a-button @click="setToTime(12)" size="small" type="link"
              >今天 12:00</a-button
            >
            <a-button @click="setToTime(13)" size="small" type="link"
              >今天 13:00</a-button
            >
            <a-button @click="setToTimeYesterday(22)" size="small" type="link"
              >昨天 22:00</a-button
            >
            <a-button @click="setToTimeYesterday(23)" size="small" type="link"
              >昨天 23:00</a-button
            >
          </div>
        </template>
      </a-range-picker>
    </a-form-item>

    <a-form-item>
      <template #label>
        <div class="label">相关描述</div>
      </template>
      <a-textarea v-model:value="description" placeholder="请输入睡眠描述" rows="4" />
    </a-form-item>

    <!-- 显示睡眠时长 -->
    <a-form-item>
      <div v-if="range[0] && range[1]" class="text-lg italic opacity-50">
        <p>
          从 {{ range[0]?.format("YYYY-MM-DD HH:mm:ss") }} 到
          {{ range[1]?.format("YYYY-MM-DD HH:mm:ss") }}，共睡了 {{ calculateDuration }}。
        </p>
      </div>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, onMounted, computed } from "vue";
import { Form, RangePicker, Input, Button } from "ant-design-vue";
import dayjs from "dayjs";

// Define the props to receive the range value for v-model binding
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      startTime: null,
      endTime: null,
      description: "",
    }),
  },
});

// Emit updated values back to the parent component
const emit = defineEmits(["update:modelValue"]);

// Local state to hold the range and description
const range = ref([props.modelValue.startTime, props.modelValue.endTime]);
const description = ref(props.modelValue.description);

// Default start time: previous day's 11:00 PM
onMounted(() => {
  //   if (!range.value[0]) {
  //     range.value[0] = dayjs()
  //       .subtract(1, "day")
  //       .set("hour", 23)
  //       .set("minute", 0)
  //       .set("second", 0); // Set to previous day's 11:00 PM
  //   }
  //   if (!range.value[1]) {
  //     range.value[1] = dayjs(); // End time is now
  //   }
});

// Watch for changes in the range and description, and emit the updated value
watch(
  [range, description],
  () => {
    emit("update:modelValue", {
      startTime: range.value[0],
      endTime: range.value[1],
      description: description.value,
    });
  },
  {
    deep: true,
  }
);

// Predefined time ranges (e.g., 10 minutes, 30 minutes, 1 hour, etc.)
const timePresets = [
  {
    label: "10 分钟",
    value: [
      dayjs().subtract(10, "minute").startOf("minute"), // Start time: 10 minutes ago
      dayjs(), // End time: now
    ],
  },
  {
    label: "半小时",
    value: [
      dayjs().subtract(30, "minute").startOf("minute"), // Start time: 30 minutes ago
      dayjs(), // End time: now
    ],
  },
  {
    label: "1 小时",
    value: [
      dayjs().subtract(1, "hour").startOf("hour"), // Start time: 1 hour ago
      dayjs(), // End time: now
    ],
  },
  {
    label: "4 小时",
    value: [
      dayjs().subtract(4, "hour").startOf("hour"), // Start time: 4 hours ago
      dayjs(), // End time: now
    ],
  },
  {
    label: "8 小时",
    value: [
      dayjs().subtract(8, "hour").startOf("hour"), // Start time: 8 hours ago
      dayjs(), // End time: now
    ],
  },
  {
    label: "10 小时",
    value: [
      dayjs().subtract(10, "hour").startOf("hour"), // Start time: 10 hours ago
      dayjs(), // End time: now
    ],
  },
];

// 计算睡眠时长（单位：小时、分钟、秒）
const calculateDuration = computed(() => {
  if (range.value[0] && range.value[1]) {
    const start = range.value[0];
    const end = range.value[1];
    const durationInSeconds = end.diff(start, "second"); // Calculate total duration in seconds

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    // Return formatted string (e.g., "2 hours 30 minutes 45 seconds")
    return `${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;
  }
  return "0 小时 0 分钟 0 秒"; // Default value if no range is selected
});

// 设置开始时间为特定时间
const setToTime = (hour) => {
  if (focusStartTime.value) {
    range.value[0] = dayjs().set("hour", hour).set("minute", 0).set("second", 0);
  } else {
    range.value[1] = dayjs().set("hour", hour).set("minute", 0).set("second", 0);
  }
};

// 设置开始时间为昨天的特定时间
const setToTimeYesterday = (hour) => {
  if (focusStartTime.value) {
    range.value[0] = dayjs()
      .subtract(1, "day")
      .set("hour", hour)
      .set("minute", 0)
      .set("second", 0);
  } else {
    range.value[1] = dayjs()
      .subtract(1, "day")
      .set("hour", hour)
      .set("minute", 0)
      .set("second", 0);
  }
};

// Variables to track focus on the start and end time input
const focusStartTime = ref(true);

function calendarChange(e) {
  if (e[0]) {
    focusStartTime.value = false;
  } else {
    focusStartTime.value = true;
  }
  range.value = e
}
</script>

<style scoped>
/* Optional: Custom styles if needed */

.label {
  min-width: 108px;
  font-size: large;
  padding: 0.5rem;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  padding: 12px 6px;
}
</style>
