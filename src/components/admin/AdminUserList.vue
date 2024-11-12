<template>
    <div class="admin-user-list">
      <h1>Danh sách người dùng</h1>
      <table>
        <thead>
          <tr>
            <th>Mã Người Dùng</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Trạng Thái</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.status }}</td>
            <td>
              <button @click="toggleStatus(user)">Thay đổi trạng thái</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [], // Danh sách người dùng sẽ được lấy từ API
      };
    },
    methods: {
      fetchUsers() {
        this.users = [
          { id: 'USR001', name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', status: 'Kích hoạt' },
          { id: 'USR002', name: 'Trần Thị B', email: 'tranthib@example.com', status: 'Đã khóa' },
        ];
      },
      toggleStatus(user) {
        console.log(`Thay đổi trạng thái cho người dùng ${user.id}`);
      },
    },
    created() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style scoped>
  .admin-user-list {
    padding: 16px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    border: 1px solid #ddd;
  }
  th {
    background-color: #f4f4f9;
  }
  </style>
  