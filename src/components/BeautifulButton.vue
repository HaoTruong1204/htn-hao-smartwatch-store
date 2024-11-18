<template>
    <button
      :class="buttonClasses"
      @click="handleClick"
      :disabled="disabled"
      :type="type"
      aria-label="button"
    >
      <!-- Hiển thị icon nếu có -->
      <i v-if="icon" :class="['button-icon', icon]"></i>
      <!-- Hiển thị nội dung bên trong -->
      <span><slot /></span>
    </button>
  </template>
  
  <script>
  export default {
    name: "BeautifulButton",
    props: {
      // Nội dung nút
      label: {
        type: String,
        default: "",
      },
      // Kiểu nút (primary, secondary, danger, etc.)
      variant: {
        type: String,
        default: "primary", // Các kiểu: primary, secondary, success, danger
      },
      // Kích thước nút (small, medium, large)
      size: {
        type: String,
        default: "medium", // Các kích thước: small, medium, large
      },
      // Icon hiển thị trong nút
      icon: {
        type: String,
        default: "", // Ví dụ: 'fas fa-plus'
      },
      // Loại button (submit, button, reset)
      type: {
        type: String,
        default: "button",
      },
      // Trạng thái disabled
      disabled: {
        type: Boolean,
        default: false,
      },
      // Event click handler
      action: {
        type: Function,
        default: null,
      },
    },
    computed: {
      // Tạo danh sách class cho nút
      buttonClasses() {
        return [
          "beautiful-button",
          `beautiful-button--${this.variant}`,
          `beautiful-button--${this.size}`,
          { "beautiful-button--disabled": this.disabled },
        ];
      },
    },
    methods: {
      handleClick() {
        if (!this.disabled && this.action) {
          this.action();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Style cơ bản */
  .beautiful-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
  }
  
  /* Hover và Active */
  .beautiful-button:hover {
    background-color: #0056b3;
    box-shadow: 0 6px 12px rgba(0, 123, 255, 0.4);
    transform: translateY(-2px);
  }
  
  .beautiful-button:active {
    transform: translateY(0);
    box-shadow: 0 3px 6px rgba(0, 123, 255, 0.4);
  }
  
  /* Trạng thái Disabled */
  .beautiful-button--disabled {
    background-color: #d6d6d6;
    color: #8a8a8a;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  /* Kích thước nút */
  .beautiful-button--small {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .beautiful-button--medium {
    padding: 10px 20px;
    font-size: 16px;
  }
  
  .beautiful-button--large {
    padding: 14px 28px;
    font-size: 18px;
  }
  
  /* Các kiểu nút */
  .beautiful-button--primary {
    background-color: #007bff;
    color: white;
  }
  
  .beautiful-button--secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .beautiful-button--success {
    background-color: #28a745;
    color: white;
  }
  
  .beautiful-button--danger {
    background-color: #dc3545;
    color: white;
  }
  
  /* Icon trong nút */
  .button-icon {
    margin-right: 8px;
    font-size: 18px;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .beautiful-button {
      font-size: 14px;
      padding: 8px 16px;
    }
  
    .button-icon {
      font-size: 16px;
    }
  }
  </style>
  