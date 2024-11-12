<template>
    <div class="input-group">
      <label v-if="label">{{ label }}</label>
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="$emit('input', inputValue)"
      />
      <span v-if="error" class="error-message">{{ error }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      type: {
        type: String,
        default: 'text',
      },
      placeholder: String,
      value: String,
      error: String,
    },
    data() {
      return {
        inputValue: this.value,
      };
    },
    watch: {
      value(newValue) {
        this.inputValue = newValue;
      },
    },
  };
  </script>
  
  <style scoped>
  .input-group {
    margin-bottom: 16px;
  }
  
  label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.3s;
  }
  
  input:focus {
    border-color: #2a9d8f;
    outline: none;
  }
  
  .error-message {
    color: #e63946;
    font-size: 0.875rem;
    margin-top: 4px;
  }
  </style>
  