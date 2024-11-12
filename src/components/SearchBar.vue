<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @keydown.enter="onSearch"
        placeholder="Tìm kiếm sản phẩm..."
        aria-label="Search Products"
        class="search-input"
      />
      <button @click="onSearch" class="search-button" aria-label="Search">
        🔍
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "SearchBar",
    props: {
      placeholderText: {
        type: String,
        default: "Tìm kiếm sản phẩm...",
      },
    },
    data() {
      return {
        searchQuery: "",
      };
    },
    methods: {
      onSearch() {
        if (this.searchQuery.trim()) {
          this.$emit("search", this.searchQuery);
          this.searchQuery = ""; // Xóa nội dung sau khi tìm kiếm
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Search Bar Styles */
  .search-bar {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 25px;
    padding: 5px 15px;
    width: 100%;
    max-width: 300px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .search-input {
    border: none;
    outline: none;
    font-size: 14px;
    padding: 8px;
    flex: 1;
  }
  
  .search-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #003366;
    padding: 5px;
    transition: color 0.3s;
  }
  
  .search-button:hover {
    color: #ffcc00;
  }
  </style>
  