<template>
  <div class="page blog-detail-page">
    <div v-if="blogData" class="blog-container">
      <!-- Tiêu đề và ngày đăng -->
      <h1 class="blog-title">{{ blogData.title }}</h1>
      <p class="blog-date">Đăng ngày: {{ formatDate(blogData.date) }}</p>
      
      <!-- Hình ảnh bài viết -->
      <img :src="blogData.image" :alt="blogData.title" class="blog-image" />

      <!-- Nội dung bài viết -->
      <div class="blog-content">
        <template v-if="Array.isArray(blogData.content)">
          <div v-for="(item, index) in blogData.content" :key="index" class="blog-item">
            <span class="blog-icon" v-html="item.icon"></span>
            <p class="blog-text" v-html="item.details"></p>
          </div>
        </template>
        <template v-else>
          <p>{{ blogData.content }}</p>
        </template>
      </div>

      <!-- Các nút hành động -->
      <div class="blog-actions">
        <BeautifulButton
          label="Chia sẻ"
          variant="primary"
          @clicked="shareBlog"
        />
        <BeautifulButton
          label="Bình luận"
          variant="secondary"
          @clicked="toggleComments"
        />
      </div>

      <!-- Phần bình luận -->
      <div v-if="showComments" class="comments-section">
        <h3>Bình luận</h3>
        <div v-if="comments.length > 0">
          <div v-for="(comment, index) in comments" :key="index" class="comment">
            <strong>{{ comment.author }}</strong>
            <p>{{ comment.text }}</p>
            <span class="comment-date">{{ formatDate(comment.date) }}</span>
          </div>
        </div>
        <form @submit.prevent="addComment" class="comment-form">
          <input
            v-model="newComment.author"
            type="text"
            placeholder="Tên của bạn"
            required
            aria-label="Tên của bạn"
          />
          <textarea
            v-model="newComment.text"
            placeholder="Viết bình luận..."
            required
            aria-label="Viết bình luận"
          ></textarea>
          <BeautifulButton
            label="Gửi Bình luận"
            variant="primary"
            type="submit"
          />
        </form>
      </div>

      <!-- Link quay lại danh sách bài viết -->
      <router-link to="/blog" class="back-link">← Quay lại danh sách bài viết</router-link>
    </div>

    <!-- Trường hợp bài viết không tồn tại -->
    <div v-else class="not-found">
      <h2>Không tìm thấy bài viết</h2>
      <p>Rất tiếc, bài viết bạn tìm không tồn tại.</p>
      <router-link to="/blog" class="back-link">← Quay lại danh sách bài viết</router-link>
    </div>
  </div>
</template>

<script>
import BeautifulButton from "@/components/BeautifulButton.vue"; // Đảm bảo đường dẫn chính xác

export default {
  name: "BlogDetailPage",
  components: {
    BeautifulButton,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      blogs: [
      {
  id: "1",
  title: "10 Mẹo Sử Dụng Đồng Hồ Hiệu Quả",
  summary: "Hướng dẫn chi tiết giúp bạn bảo quản và sử dụng đồng hồ đúng cách, đảm bảo đồng hồ của bạn luôn hoạt động tốt và bền bỉ với thời gian.",
  content: [
    {
      icon: "🌊",
      details:
        "Tránh tiếp xúc đồng hồ với nước, đặc biệt là đồng hồ không có khả năng chống nước. Nếu cần, hãy tháo đồng hồ ra trước khi rửa tay, tắm hoặc đi bơi. Đối với đồng hồ có khả năng chống nước, hãy tránh ngâm lâu trong nước hoặc tiếp xúc với nước nóng để bảo vệ các bộ phận gioăng.",
    },
    {
      icon: "✨",
      details:
        "Làm sạch đồng hồ định kỳ bằng khăn mềm hoặc dung dịch vệ sinh chuyên dụng. Hãy đảm bảo lau chùi nhẹ nhàng các khe hở, dây đeo và mặt đồng hồ để loại bỏ bụi bẩn, mồ hôi tích tụ, giúp đồng hồ luôn sáng bóng như mới.",
    },
    {
      icon: "🛠️",
      details:
        "Bảo quản đồng hồ trong hộp chuyên dụng hoặc túi vải mềm khi không sử dụng. Điều này giúp tránh các va đập không mong muốn và hạn chế trầy xước. Đặt hộp đồng hồ ở nơi khô ráo, thoáng mát, tránh tiếp xúc với ánh nắng trực tiếp.",
    },
    {
      icon: "🧲",
      details:
        "Tránh để đồng hồ gần các thiết bị từ tính như loa, điện thoại, hoặc lò vi sóng. Từ trường mạnh có thể làm hỏng bộ máy hoặc làm sai lệch thời gian hiển thị của đồng hồ.",
    },
    {
      icon: "🔋",
      details:
        "Kiểm tra và thay pin định kỳ. Khi đồng hồ có dấu hiệu chậm giờ hoặc ngừng hoạt động, hãy thay pin ngay lập tức tại trung tâm bảo hành uy tín. Sử dụng pin kém chất lượng có thể gây rò rỉ, làm hỏng bộ máy bên trong.",
    },
    {
      icon: "🤾‍♂️",
      details:
        "Hạn chế đeo đồng hồ khi vận động mạnh hoặc chơi thể thao, trừ khi đó là đồng hồ chuyên dụng. Đồng hồ thông thường dễ bị va đập và tổn hại khi sử dụng trong điều kiện không phù hợp.",
    },
    {
      icon: "⏳",
      details:
        "Lên dây cót định kỳ nếu bạn sử dụng đồng hồ cơ. Xoay núm đồng hồ theo chiều đúng cách để đảm bảo bộ máy hoạt động chính xác và tránh bị kẹt hoặc hỏng hóc.",
    },
    {
      icon: "🔥",
      details:
        "Tránh để đồng hồ trong môi trường có nhiệt độ quá cao hoặc quá thấp. Nhiệt độ khắc nghiệt có thể làm cong vênh các linh kiện bên trong hoặc làm mất tính ổn định của đồng hồ.",
    },
    {
      icon: "🪛",
      details:
        "Thường xuyên kiểm tra dây đeo và khóa cài. Đảm bảo chúng không bị lỏng hoặc hỏng để tránh đồng hồ bị rơi mất trong quá trình sử dụng.",
    },
    {
      icon: "🛡️",
      details:
        "Định kỳ mang đồng hồ đến trung tâm bảo hành để kiểm tra, làm sạch, và thay dầu. Bảo dưỡng định kỳ giúp đồng hồ hoạt động ổn định và kéo dài tuổi thọ.",
    },
  ],
  image: "/images/blogs/watch-tips.jpg",
  date: "2024-11-01",
},
{
  id: "2",
  title: "Xu Hướng Đồng Hồ 2024",
  summary: "Khám phá những thiết kế, công nghệ và màu sắc nổi bật đang định hình thị trường đồng hồ trong năm 2024.",
  content: [
    {
      icon: "⌚",
      details:
        "Đồng hồ thông minh thế hệ mới: Năm 2024, đồng hồ thông minh tiếp tục dẫn đầu với các tính năng nâng cấp vượt bậc. Ngoài theo dõi sức khỏe như đo nồng độ oxy, nhịp tim, và giấc ngủ, các mẫu mới còn hỗ trợ kết nối không dây vượt trội, cải thiện thời lượng pin và tích hợp trợ lý ảo thông minh. Đây là lựa chọn lý tưởng cho người dùng hiện đại yêu thích công nghệ.",
    },
    {
      icon: "🎨",
      details:
        "Màu sắc thời thượng năm 2024: Các tông màu như xanh ngọc, vàng hồng, bạc mờ, và đen tuyền đang trở thành xu hướng chủ đạo. Những màu sắc này không chỉ mang lại vẻ sang trọng mà còn tạo nên phong cách thời thượng, giúp người dùng tự tin trong mọi hoàn cảnh.",
    },
    {
      icon: "🌱",
      details:
        "Vật liệu thân thiện với môi trường: Nhiều thương hiệu đang chuyển hướng sang sử dụng các vật liệu bền vững như dây đeo tái chế, nhựa sinh học, và hợp kim không gây hại môi trường. Đây không chỉ là xu hướng mà còn là trách nhiệm đối với hành tinh, thu hút sự quan tâm của những khách hàng có ý thức bảo vệ môi trường.",
    },
    {
      icon: "🕰️",
      details:
        "Phong cách cổ điển lên ngôi: Thiết kế Retro với dây da cao cấp, mặt số đơn giản nhưng tinh tế đang quay trở lại mạnh mẽ. Đây là sự lựa chọn hoàn hảo cho những ai yêu thích vẻ đẹp vượt thời gian và phong cách thanh lịch.",
    },
    {
      icon: "🏋️",
      details:
        "Đồng hồ thể thao đa năng: Đồng hồ thể thao năm 2024 không chỉ tích hợp GPS mà còn hỗ trợ đo lường vận động, khả năng chống nước cao và theo dõi hiệu suất thể thao chi tiết. Đây là người bạn đồng hành không thể thiếu của những người dùng yêu thích sự năng động và khám phá.",
    },
  ],
  image: "/images/blogs/watch-trends.jpg",
  date: "2024-11-05",
},
{
  id: "2",
  title: "Xu Hướng Đồng Hồ 2024",
  summary:
    "Khám phá những thiết kế, công nghệ và màu sắc nổi bật đang định hình thị trường đồng hồ trong năm 2024.",
  content: [
    {
      icon: "⌚",
      details:
        "Đồng hồ thông minh thế hệ mới: Năm 2024, đồng hồ thông minh tiếp tục dẫn đầu với các tính năng nâng cấp vượt bậc. Ngoài theo dõi sức khỏe như đo nồng độ oxy, nhịp tim, và giấc ngủ, các mẫu mới còn hỗ trợ kết nối không dây vượt trội, cải thiện thời lượng pin và tích hợp trợ lý ảo thông minh. Đây là lựa chọn lý tưởng cho người dùng hiện đại yêu thích công nghệ.",
    },
    {
      icon: "🎨",
      details:
        "Màu sắc thời thượng năm 2024: Các tông màu như xanh ngọc, vàng hồng, bạc mờ, và đen tuyền đang trở thành xu hướng chủ đạo. Những màu sắc này không chỉ mang lại vẻ sang trọng mà còn tạo nên phong cách thời thượng, giúp người dùng tự tin trong mọi hoàn cảnh.",
    },
    {
      icon: "🌱",
      details:
        "Vật liệu thân thiện với môi trường: Nhiều thương hiệu đang chuyển hướng sang sử dụng các vật liệu bền vững như dây đeo tái chế, nhựa sinh học, và hợp kim không gây hại môi trường. Đây không chỉ là xu hướng mà còn là trách nhiệm đối với hành tinh, thu hút sự quan tâm của những khách hàng có ý thức bảo vệ môi trường.",
    },
    {
      icon: "🕰️",
      details:
        "Phong cách cổ điển lên ngôi: Thiết kế Retro với dây da cao cấp, mặt số đơn giản nhưng tinh tế đang quay trở lại mạnh mẽ. Đây là sự lựa chọn hoàn hảo cho những ai yêu thích vẻ đẹp vượt thời gian và phong cách thanh lịch.",
    },
    {
      icon: "🏋️",
      details:
        "Đồng hồ thể thao đa năng: Đồng hồ thể thao năm 2024 không chỉ tích hợp GPS mà còn hỗ trợ đo lường vận động, khả năng chống nước cao và theo dõi hiệu suất thể thao chi tiết. Đây là người bạn đồng hành không thể thiếu của những người dùng yêu thích sự năng động và khám phá.",
    },
  ],
  image: "/images/blogs/watch-trends.jpg",
  date: "2024-11-05",
},
{
  id: "3",
  title: "Hướng Dẫn Chọn Đồng Hồ Phù Hợp",
  summary:
    "Làm thế nào để chọn được chiếc đồng hồ hoàn hảo phù hợp với phong cách, nhu cầu và ngân sách của bạn? Bài viết này sẽ giúp bạn tìm ra lựa chọn tốt nhất.",
  content: [
    {
      icon: "🎯",
      details:
        "Xác định mục đích sử dụng: Đầu tiên, hãy cân nhắc bạn sẽ sử dụng đồng hồ cho mục đích gì. Nếu sử dụng hàng ngày tại văn phòng, một chiếc đồng hồ cổ điển với thiết kế tối giản là lựa chọn lý tưởng. Nếu bạn thường xuyên tham gia thể thao, hãy ưu tiên đồng hồ có khả năng chống nước và đo lường vận động. Đối với những sự kiện trang trọng, đồng hồ thời trang cao cấp sẽ giúp bạn nổi bật hơn.",
    },
    {
      icon: "👗",
      details:
        "Phong cách cá nhân: Đồng hồ không chỉ là công cụ xem giờ mà còn là phụ kiện thể hiện phong cách cá nhân. Hãy chọn thiết kế phản ánh đúng gu thẩm mỹ của bạn: cổ điển, hiện đại, tối giản hay năng động. Đồng hồ mặt tròn thường phù hợp với phong cách cổ điển, trong khi mặt vuông hoặc thiết kế phá cách lại phù hợp với những người thích sự đổi mới.",
    },
    {
      icon: "🔍",
      details:
        "Kiểm tra thông số kỹ thuật: Đừng quên tìm hiểu về các tính năng kỹ thuật như khả năng chống nước, chất liệu kính, độ bền dây đeo và các tính năng đi kèm. Ví dụ, đồng hồ kính sapphire chống xước cao sẽ phù hợp với người dùng thường xuyên di chuyển, trong khi dây da sẽ mang lại cảm giác thoải mái và phong cách lịch lãm.",
    },
    {
      icon: "💵",
      details:
        "Ngân sách và thương hiệu: Trước khi mua, hãy xác định ngân sách của bạn. Các thương hiệu đồng hồ nổi tiếng như Rolex, Omega hay Casio đều có những dòng sản phẩm phù hợp với nhiều mức giá. Lựa chọn một thương hiệu uy tín không chỉ đảm bảo chất lượng mà còn giúp bạn yên tâm sử dụng lâu dài.",
    },
    {
      icon: "⏲️",
      details:
        "Thử đồng hồ trực tiếp: Hãy đến cửa hàng và thử đồng hồ trực tiếp để đảm bảo sản phẩm vừa vặn và thoải mái khi đeo. Một chiếc đồng hồ tốt không chỉ đẹp mà còn phải phù hợp với kích thước cổ tay và mang lại cảm giác dễ chịu khi sử dụng cả ngày.",
    },
  ],
  image: "/images/blogs/watch-guide.jpg",
  date: "2024-11-10",
},


      ],
      blogData: null,
      showComments: false,
      comments: [],
      newComment: {
        author: "",
        text: "",
      },
    };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
    toggleComments() {
      this.showComments = !this.showComments;
    },
    addComment() {
      if (!this.newComment.author.trim() || !this.newComment.text.trim()) {
        alert("Vui lòng điền đầy đủ thông tin bình luận!");
        return;
      }
      const comment = {
        author: this.newComment.author.trim(),
        text: this.newComment.text.trim(),
        date: new Date().toISOString(),
      };
      this.comments.push(comment);
      this.newComment.author = "";
      this.newComment.text = "";
      alert("Bình luận của bạn đã được gửi!");
    },
    shareBlog() {
      const shareURL = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: this.blogData.title,
          text: "Xem bài viết này tại HTN HAO STORE!",
          url: shareURL,
        });
      } else {
        alert(`Sao chép liên kết: ${shareURL}`);
      }
    },
  },
  mounted() {
    const blog = this.blogs.find((b) => b.id === this.id);
    this.blogData = blog || {
      title: "Không tìm thấy bài viết",
      content: ["Rất tiếc, bài viết bạn tìm không tồn tại."],
      image: "/images/blogs/not-found.jpg",
      date: new Date().toISOString(),
    };
  },
};
</script>

<style scoped>
/* Định dạng tổng thể */
.page {
  padding: 40px 20px;
  background-color: #f9f9f9;
  font-family: "Roboto", sans-serif;
}
.blog-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.blog-title {
  font-size: 2rem;
  color: #003366;
  text-align: center;
  margin-bottom: 20px;
}
.blog-date {
  text-align: center;
  color: #777;
  margin-bottom: 30px;
}
.blog-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.blog-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.blog-icon {
  font-size: 1.5rem;
  margin-right: 10px;
  color: #003366;
}
.blog-text {
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>
