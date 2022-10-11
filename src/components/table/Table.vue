<template lang="html">
  <table class="w-100">
    <Row :cells="headers" :isHeaderRow="true" />
    <Row :cells="item" v-for="(item, index) in data" :key="index" />
  </table>
</template>
<script>
import Row from "./Row.vue";
export default {
  name: "table-component",
  components: { Row },
  props: {
    data: Object,
  },
  data() {
    return {
      headers: ["Date", "Distance", "Name", "Quantity"],
    };
  },
};
</script>
<style scoped lang="scss">
table {
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  text-align: left;
  border-collapse: separate;
  border-spacing: 5px;
  background: #ece9e0;
  color: #656665;
  border: 16px solid #ece9e0;
  border-radius: 20px;
}
</style>
