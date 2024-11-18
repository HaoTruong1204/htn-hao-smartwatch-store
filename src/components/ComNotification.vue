  <!-- src/components/Notification.vue -->
  <template>
      <transition name="fade">
        <div
          v-if="visible"
          :class="['notification', type]"
          @click="hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {{ message }}
        </div>
      </transition>
    </template>
    
    <script>
    export default {
      name: "Notification",
      data() {
        return {
          visible: false,
          message: "",
          type: "success", // 'success', 'error', 'info'
          timeoutId: null,
        };
      },
      methods: {
        /**
         * Hiển thị thông báo với nội dung và loại thông báo.
         * @param {string} message - Nội dung thông báo.
         * @param {string} type - Loại thông báo ('success', 'error', 'info').
         */
        show(message, type = "success") {
          this.message = message;
          this.type = type;
          this.visible = true;
    
          // Đặt lại timeout nếu có thông báo trước
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
    
          // Tự động ẩn thông báo sau 3 giây
          this.timeoutId = setTimeout(() => {
            this.hide();
          }, 3000);
        },
        /**
         * Ẩn thông báo.
         */
        hide() {
          this.visible = false;
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
          }
        },
      },
    };
    </script>
    
    <style scoped>
    /* Animations */
    .fade-enter-active, .fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter-from, .fade-leave-to {
      opacity: 0;
    }
    
    /* Notification Styles */
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 5px;
      color: white;
      cursor: pointer;
      z-index: 1000;
      opacity: 0.95;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      max-width: 300px;
      word-wrap: break-word;
    }
    
    .notification.success {
      background-color: #4caf50;
    }
    
    .notification.error {
      background-color: #f44336;
    }
    
    .notification.info {
      background-color: #2196f3;
    }
    
    /* Hover Effect */
    .notification:hover {
      opacity: 1;
    }
    
    /* Responsive Design */
    @media (max-width: 576px) {
      .notification {
        top: 10px;
        right: 10px;
        padding: 12px 16px;
        max-width: 90%;
      }
    }
    </style>
    