<template lang="html">
  <div class="mb-3">
    <div class="row g-3">
      <div class="col-md">
        <div class="form-floating">
          <select
            v-model="selectedColumn"
            @change="selectColumn"
            class="form-select"
            id="floatingSelectGrid"
          >
            <option :value="1" selected>Without filters</option>
            <option :value="2">Name</option>
            <option :value="3">Quantity</option>
            <option :value="4">Distance</option>
          </select>
          <label for="floatingSelectGrid">Column</label>
        </div>
      </div>

      <div v-if="selectedColumn > 1" class="col-md">
        <div class="form-floating">
          <select
            @change="filter"
            v-model="selectedCondition"
            v-if="selectedColumn === 2"
            class="form-select"
            id="floatingSelectGrid"
          >
            <option
              v-for="(filterName, index) in stringFilters"
              :key="index"
              :value="filterName"
            >
              {{ filterName }}
            </option>
          </select>
          <select
            v-model="selectedCondition"
            @change="filter"
            v-else
            class="form-select"
            id="floatingSelectGrid"
          >
            <option
              v-for="(filterName, index) in numberFilters"
              :key="index"
              :value="filterName"
            >
              {{ filterName }}
            </option>
          </select>
          <label for="floatingSelectGrid">Condition</label>
        </div>
      </div>
      <div v-if="selectedCondition && selectedColumn > 1" class="col-md">
        <div class="form-floating">
          <input
            @change="filter"
            :type="getValueType"
            min="1"
            class="form-control"
            id="floatingInputGrid"
            placeholder="name@example.com"
            v-model="filterValue"
          />
          <label for="floatingInputGrid">Value</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "filters-component",
  data() {
    return {
      selectedColumn: 1,
      stringFilters: ["equally", "contains"],
      numberFilters: ["equally", "more", "less"],
      selectedCondition: "",
      filterValue: "",
    };
  },
  methods: {
    filter() {
      this.$emit("filter", {
        column: this.selectedColumn,
        condition: this.selectedCondition,
        value: this.filterValue,
      });
      this.$emit("pageReset");
    },
    selectColumn() {
      this.selectedCondition = "";
      this.filterValue = "";
      this.filter();
    },
  },
  computed: {
    getValueType() {
      if (
        this.selectedCondition === "more" ||
        this.selectedCondition === "less" ||
        (this.selectedCondition === "equally" && this.selectedColumn === 3) ||
        (this.selectedCondition === "equally" && this.selectedColumn === 4)
      ) {
        return "number";
      } else return "text";
    },
  },
};
</script>
<style lang="scss"></style>
