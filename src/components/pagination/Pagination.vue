<template lang="html">
  <nav aria-label="Page navigation example">
    <ul class="pagination m-0">
      <li class="page-item">
        <a @click="previous" class="page-link" href="#">Previous</a>
      </li>
      <li v-for="index in pageCount" :key="index">
        <a
          v-if="
            index >= currentPage - 1 ||
            index >= currentPage + 1 ||
            currentPage === 1
          "
          @click="paginateData(index)"
          class="page-link"
          href="#"
          >{{ index }}</a
        >
      </li>
      <li class="page-item">
        <a @click="next" class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "pagination-component",
  props: {
    len: Number,
    currentPage: Number,
  },
  data() {
    return {};
  },
  methods: {
    paginateData(page) {
      this.$emit("changePage", page);
    },
    previous() {
      if (this.currentPage === 1) return;
      const newPage = this.currentPage - 1;
      this.paginateData(newPage);
    },
    next() {
      if (this.currentPage === this.len) return;
      const newPage = this.currentPage + 1;
      this.paginateData(newPage);
    },
  },
  computed: {
    pageCount() {
      if (this.len < 3) return this.len;
      if (this.currentPage === 1) {
        return this.currentPage + 2;
      }
      if (this.currentPage === this.len) {
        return this.currentPage;
      }
      return this.currentPage + 1;
    },
  },
};
</script>
<style lang="scss"></style>
