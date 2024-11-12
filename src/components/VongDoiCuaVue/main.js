// Khởi tạo ứng dụng Vue
const app = Vue.createApp({
    data() {
      return {
        count: 0,
        message: 'This is my text',
      };
    },
    methods: {
      increment() {
        this.count++;
      },
    },
    // Hook created - Được gọi sau khi component được tạo, nhưng trước khi gắn vào DOM
    created() {
      console.log('Component đã được tạo (created hook)');
    },
    // Hook mounted - Được gọi khi component đã được gắn vào DOM
    mounted() {
      console.log('Component đã được gắn vào DOM (mounted hook)');
    },
    // Hook updated - Được gọi khi dữ liệu thay đổi và component được cập nhật lại
    updated() {
      console.log('Component đã được cập nhật (updated hook)');
    },
    // Hook unmounted - Được gọi khi component bị gỡ bỏ khỏi DOM
    unmounted() {
      console.log('Component đã bị gỡ bỏ khỏi DOM (unmounted hook)');
    },
    // Template nội tuyến
    template: `
      <div id="my-text">
        {{ message }} - Đếm: {{ count }}
        <button @click="increment">Tăng</button>
      </div>
    `,
  });
  
  // Gắn ứng dụng Vue vào phần tử #app
  app.mount('#app');
  
  // Hủy bỏ ứng dụng sau 5 giây (demonstration purpose)
  setTimeout(() => {
    app.unmount('#app');
    console.log('Ứng dụng Vue đã bị hủy');
  }, 5000);
  