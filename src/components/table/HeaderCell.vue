<template lang="html">
  <th>{{ cell }}</th>
</template>
<script>
export default {
  name: "header-cell-component",
  props: {
    cell: String,
  },
};
</script>
<style scoped lang="scss">
th {
  font-size: 18px;
  padding: 10px;
}
</style>
