<template>
    <div v-if="visible" class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <h3>{{ title }}</h3>
          <button @click="$emit('close')" class="close-btn">×</button>
        </header>
        <section class="modal-body">
          <slot></slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <Button @click="$emit('close')">Đóng</Button>
          </slot>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  import Button from './ComButton.vue';
  
  export default {
    components: { Button },
    props: {
      title: {
        type: String,
        default: 'Modal Title',
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal {
    background-color: #fff;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: slideDown 0.3s ease-out;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ddd;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .modal-body {
    padding: 16px;
  }
  
  .modal-footer {
    padding: 16px;
    border-top: 1px solid #ddd;
    text-align: right;
  }
  
  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>
  