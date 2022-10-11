<template lang="html">
  <tr v-if="isHeaderRow">
    <HeaderCell :cell="cell" v-for="(cell, index) in cells" :key="index" />
  </tr>
  <tr v-else>
    <Cell :cell="String(cell)" v-for="(cell, index) in cells" :key="index" />
  </tr>
</template>
<script>
import Cell from "./Cell.vue";
import HeaderCell from "./HeaderCell.vue";
export default {
  name: "row-component",
  props: {
    isHeaderRow: Boolean,
    cells: Object,
  },
  components: { Cell, HeaderCell },
};
</script>
<style lang="scss"></style>
