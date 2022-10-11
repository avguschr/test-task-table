<template lang="html">
  <td>{{ cell }}</td>
</template>
<script>
export default {
  name: "cell-component",
  props: {
    cell: String,
  },
};
</script>
<style scoped lang="scss">
td {
  background: #f5d7bf;
  padding: 10px;
}
</style>
