<template>
  <a-form class="space-y-6" size="large" labelAlign="left" :colon="false">
    <a-form-item>
      <template #label>
        <div class="label">记录吸烟</div>
      </template>
      <a-date-picker show-time placeholder="选择时间" v-model:value="time">
        <template #renderExtraFooter>
          <div class="button-group">
            <a-button size="small" type="link" @click="setTimeMinutesAgo(5)"
              >五分钟前</a-button
            >
            <a-button size="small" type="link" @click="setTimeMinutesAgo(10)"
              >十分钟前</a-button
            >
            <a-button size="small" type="link" @click="setTimeMinutesAgo(3)"
              >三分钟前</a-button
            >
            <a-button size="small" type="link" @click="setTimeMinutesAgo(15)"
              >十五分钟前</a-button
            >
            <a-button size="small" type="link" @click="setTimeMinutesAgo(20)"
              >二十分钟前</a-button
            >
            <a-button size="small" type="link" @click="setTimeMinutesAgo(1)"
              >一分钟前</a-button
            >
            <a-button size="small" type="link" @click="setTimeNow">刚刚</a-button>
            <a-button size="small" type="link" @click="setTimeNowExact">现在</a-button>
          </div>
        </template>
      </a-date-picker>
    </a-form-item>
    <a-form-item>
      <template #label>
        <div class="label">吸烟数量</div>
      </template>
      <a-input v-model:value="smokeCount" placeholder="吸了多少" rows="4" type="number" min="0"/>
    </a-form-item>
    <a-form-item>
      <template #label>
        <div class="label">相关描述</div>
      </template>
      <a-textarea v-model:value="description" placeholder="请输入描述" rows="4" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { Form, DatePicker, Input, Button } from "ant-design-vue";
import dayjs from "dayjs";

// Define the props to receive the value for v-model binding
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      time: "",
      description: "",
    }),
  },
});

// Emit updated values back to the parent component
const emit = defineEmits(["update:modelValue"]);

const time = ref(props.modelValue.time);
const description = ref(props.modelValue.description);
const smokeCount = ref(1)


// Watch for changes and emit updated values
watch([time, description], () => {
  emit("update:modelValue", {
    time: time.value,
    description: description.value,
    smokeCount:smokeCount.value
  });
});

// Method to set time for a certain number of minutes ago
const setTimeMinutesAgo = (minutes) => {
  time.value = dayjs().subtract(minutes, "minute");
};

// Method to set the time as "刚刚" (just now)
const setTimeNow = () => {
  time.value = dayjs().startOf("minute"); // Set to the current minute, no seconds
};

// Method to set the time as "现在" (exactly now, with seconds)
const setTimeNowExact = () => {
  time.value = dayjs(); // Set to the exact current time
};
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
