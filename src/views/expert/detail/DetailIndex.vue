<template>
  <div class="detail-count-list">
    <div class="count-item">
      <p class="count-num">4周</p>
      <p class="count-text">本月工作</p>
    </div>
    <div class="count-item">
      <p class="count-num">634.5周</p>
      <p class="count-text">累计工作</p>
    </div>
    <div class="count-item">
      <p class="count-num">21个</p>
      <p class="count-text">参与项目</p>
    </div>
  </div>
  <div class="detail-container"></div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
onMounted(() => {
  console.log(2)
  console.log(router.currentRoute.value)
})
</script>

<style lang="less" scoped></style>
