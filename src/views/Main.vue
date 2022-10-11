<template lang="html">
  <div class="w-100">
    <Filters @filter="filter" @pageReset="pageReset" />
    <div v-if="dataLength">
      <Table :data="paginatedData" class="mb-3" />

      <div class="d-flex align-items-center justify-content-between">
        <div>
          <label for="customRange3" class="form-label">Limit</label>
          <input
            @change="currentPage = 1"
            v-model="limit"
            type="range"
            class="form-range"
            min="1"
            max="9"
            step="1"
            id="customRange3"
          />
        </div>
        <Pagination
          :currentPage="currentPage"
          @changePage="changePage"
          :len="pageQuantity"
        />
      </div>
    </div>
    <div v-else>
      <p>Nothing found</p>
    </div>
  </div>
</template>
<script>
import Table from "../components/table/Table.vue";
import { getDatabase, ref, child, get } from "firebase/database";
import Pagination from "../components/pagination/Pagination.vue";
import Filters from "@/components/filters/Filters.vue";
export default {
  name: "main-component",
  components: { Table, Pagination, Filters },
  data() {
    return {
      data: {},
      errorMessage: "",
      limit: 4,
      currentPage: 1,
      filterData: {},
    };
  },
  methods: {
    fetchData() {
      const dbRef = ref(getDatabase());

      get(child(dbRef, `data`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.data = snapshot.val();
            this.filterData = { ...this.data };
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changePage(page) {
      this.currentPage = page;
    },
    pageReset() {
      this.currentPage = 1;
    },
    objectSplice(obj, num1, num2) {
      let newObj = {};
      if (!num2) {
        num2 = 1;
      }
      Object.entries(obj).forEach(([key, item], index) => {
        if (index >= num1 && index - num1 < num2) {
          newObj[key] = item;
        }
      });
      return newObj;
    },
    pagination(obj, page, limit) {
      let index;
      if (page === 1) {
        index = 0;
      } else {
        index = page * limit - limit;
      }
      return this.objectSplice(obj, index, limit);
    },
    equallyString(data, key, string) {
      const filtered = {};

      for (let item in data) {
        if (data[item][key] === string) {
          filtered[item] = data[item];
        }
      }
      return filtered;
    },
    containsString(data, key, string) {
      const filtered = {};

      for (let item in data) {
        if (~data[item][key].indexOf(string)) {
          filtered[item] = data[item];
        }
      }
      return filtered;
    },
    equallyNumber(data, key, num) {
      const filtered = {};

      for (let item in data) {
        if (+data[item][key] === num) {
          filtered[item] = data[item];
        }
      }
      return filtered;
    },
    more(data, key, num) {
      const filtered = {};

      for (let item in data) {
        if (+data[item][key] > num) {
          filtered[item] = data[item];
        }
      }
      return filtered;
    },
    less(data, key, num) {
      const filtered = {};

      for (let item in data) {
        if (+data[item][key] < num) {
          filtered[item] = data[item];
        }
      }
      return filtered;
    },
    filter(obj) {
      if (obj.column === 2) {
        if (obj.condition === "equally" && obj.value) {
          this.filterData = this.equallyString(this.data, "name", obj.value);
        } else if (obj.condition === "contains" && obj.value) {
          this.filterData = this.containsString(this.data, "name", obj.value);
        }
      } else if (obj.column === 3) {
        if (obj.condition === "equally" && obj.value > 0) {
          this.filterData = this.equallyNumber(
            this.data,
            "quantity",
            obj.value
          );
        } else if (obj.condition === "more" && obj.value > 0) {
          this.filterData = this.more(this.data, "quantity", obj.value);
        } else if (obj.condition === "less" && obj.value > 0) {
          this.filterData = this.less(this.data, "quantity", obj.value);
        }
      } else if (obj.column === 4) {
        if (obj.condition === "equally" && obj.value > 0) {
          this.filterData = this.equallyNumber(
            this.data,
            "distance",
            obj.value
          );
        } else if (obj.condition === "more" && obj.value > 0) {
          this.filterData = this.more(this.data, "distance", obj.value);
        } else if (obj.condition === "less" && obj.value > 0) {
          this.filterData = this.less(this.data, "distance", obj.value);
        }
      } else {
        this.filterData = { ...this.data };
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    paginatedData() {
      return this.pagination(this.filterData, this.currentPage, this.limit);
    },
    dataLength() {
      return Object.keys(this.filterData).length;
    },
    pageQuantity() {
      return Math.ceil(this.dataLength / this.limit);
    },
  },
};
</script>
<style lang="scss"></style>
