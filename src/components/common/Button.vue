<template>
    <button
      :class="buttonClass"
      :disabled="disabled"
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      type: {
        type: String,
        default: 'primary',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      buttonClass() {
        return {
          'btn': true,
          'btn-primary': this.type === 'primary',
          'btn-secondary': this.type === 'secondary',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .btn {
    padding: 10px 16px;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-primary {
    background-color: #2a9d8f;
    color: #fff;
  }
  
  .btn-primary:hover {
    background-color: darken(#2a9d8f, 10%);
  }
  
  .btn-secondary {
    background-color: #264653;
    color: #fff;
  }
  
  .btn-secondary:hover {
    background-color: darken(#264653, 10%);
  }
  
  .btn:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  </style>
  