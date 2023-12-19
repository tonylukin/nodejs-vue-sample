<script setup>
defineProps({
  type: 'info',
});
</script>

<template>
  <div :class="`alert alert-${type}`">
    <slot/>
  </div>
</template>

<style scoped>

</style>
