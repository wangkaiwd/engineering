<template>
  <div class="app" @click="onAdd">
    {{ count }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);
const onAdd = () => {
  count.value += 1;
};
</script>

<style lang="less" scoped>
.app {
  color: blue;
  font-size: 40px;
}
</style>
