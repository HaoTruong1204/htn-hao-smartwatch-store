<template>
    <div id="carouselBanner" class="carousel-banner" role="region" aria-label="Carousel">
      <div class="carousel" role="list">
        <div
          class="carousel-item"
          v-for="(slide, index) in banners"
          :key="index"
          :class="{ active: currentSlide === index }"
          role="listitem"
          :aria-hidden="currentSlide !== index"
        >
          <picture>
            <source media="(max-width: 768px)" :srcset="slide.imageMobile" />
            <img
              :src="slide.image"
              :alt="slide.title"
              class="carousel-image"
              loading="lazy"
            />
          </picture>
          <div class="carousel-content">
            <h1>{{ slide.title }}</h1>
            <p style="color: yellow;">{{ slide.subtitle }}</p>
            <button
              @click="$emit('navigate', slide.link)"
              class="shop-now-button"
            >
              {{ slide.buttonText }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- Điều khiển chuyển slide -->
      <div class="carousel-controls" role="group" aria-label="Slide controls">
        <button
          @click="prevSlide"
          aria-label="Previous Slide"
          class="control-button"
        >
          &laquo;
        </button>
        <button
          @click="nextSlide"
          aria-label="Next Slide"
          class="control-button"
        >
          &raquo;
        </button>
      </div>
  
      <!-- Indicators -->
      <div class="carousel-indicators" role="group" aria-label="Slide indicators">
        <span
          v-for="(slide, index) in banners"
          :key="index"
          :class="{ active: currentSlide === index }"
          @click="changeSlide(index)"
          class="indicator"
          role="button"
          tabindex="0"
          :aria-label="'Go to slide ' + (index + 1)"
          @keydown.enter.prevent="changeSlide(index)"
        ></span>
      </div>
  
      <!-- Toggle Autoplay Button -->
      <button
        @click="toggleAutoplay"
        aria-label="Toggle Autoplay"
        class="toggle-autoplay-button"
      >
        {{ autoplayInterval ? 'Pause' : 'Play' }}
      </button>
  
      <!-- Progress Bar -->
      <div class="progress-bar" aria-hidden="true">
        <div class="progress" :style="{ width: progressWidth + '%' }"></div>
      </div>
    </div>
  </template>
  
  <script>
  import Hammer from "hammerjs";
  
  export default {
    name: "CarouselBanner",
    data() {
      return {
        currentSlide: 0,
        banners: [
          {
            image: require("@/assets/images/banner1.jpg"),
            imageMobile: require("@/assets/images/banner1-mobile.jpg"),
            title: "Chào mừng đến với HTN HAO STORE",
            subtitle: "Nơi mua sắm đồng hồ và phụ kiện chính hãng",
            buttonText: "Mua ngay",
            link: "products",
          },
          {
            image: require("@/assets/images/banner2.jpg"),
            imageMobile: require("@/assets/images/banner2-mobile.jpg"),
            title: "Ưu đãi đặc biệt",
            subtitle: "Giảm giá lên đến 50% cho đồng hồ cao cấp",
            buttonText: "Xem ngay",
            link: "promo",
          },
          {
            image: require("@/assets/images/banner3.jpg"),
            imageMobile: require("@/assets/images/banner3-mobile.jpg"),
            title: "Sản phẩm mới",
            subtitle: "Khám phá các mẫu đồng hồ mới nhất",
            buttonText: "Khám phá",
            link: "new-products",
          },
        ],
        autoplayInterval: null,
        progressInterval: null,
        progressWidth: 0,
        hammer: null,
      };
    },
    computed: {
      totalSlides() {
        return this.banners.length;
      },
    },
    methods: {
      prevSlide() {
        this.currentSlide =
          (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.restartAutoplay();
      },
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.restartAutoplay();
      },
      changeSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
          this.currentSlide = index;
          this.restartAutoplay();
        }
      },
      startAutoplay() {
        this.autoplayInterval = setInterval(this.nextSlide, 5000);
        this.startProgress();
      },
      stopAutoplay() {
        if (this.autoplayInterval) {
          clearInterval(this.autoplayInterval);
          this.autoplayInterval = null;
        }
        this.stopProgress();
      },
      toggleAutoplay() {
        if (this.autoplayInterval) {
          this.stopAutoplay();
        } else {
          this.startAutoplay();
        }
      },
      restartAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
      },
      handleKeydown(event) {
        if (event.key === "ArrowLeft") {
          this.prevSlide();
        } else if (event.key === "ArrowRight") {
          this.nextSlide();
        }
      },
      handleSwipe(event) {
        if (event.type === "swipeleft" || event.type === "panleft") {
          this.nextSlide();
        } else if (event.type === "swiperight" || event.type === "panright") {
          this.prevSlide();
        }
      },
      startProgress() {
        this.progressWidth = 0;
        this.progressInterval = setInterval(() => {
          if (this.progressWidth >= 100) {
            this.progressWidth = 0;
          } else {
            this.progressWidth += 0.2; // Tốc độ tăng progress
          }
        }, 10); // Tốc độ cập nhật progress
      },
      stopProgress() {
        if (this.progressInterval) {
          clearInterval(this.progressInterval);
          this.progressInterval = null;
          this.progressWidth = 0;
        }
      },
    },
    mounted() {
      this.startAutoplay();
  
      // Tạm dừng autoplay khi hover vào carousel
      const carouselElement = document.getElementById('carouselBanner');
      carouselElement.addEventListener("mouseenter", this.stopAutoplay);
      carouselElement.addEventListener("mouseleave", this.startAutoplay);
  
      // Thêm sự kiện nghe bàn phím
      window.addEventListener("keydown", this.handleKeydown);
  
      // Thêm hỗ trợ vuốt và kéo
      this.hammer = new Hammer(carouselElement);
      this.hammer.on("swipeleft swiperight panleft panright", this.handleSwipe);
    },
    beforeUnmount() {
      this.stopAutoplay();
  
      // Loại bỏ sự kiện nghe bàn phím
      window.removeEventListener("keydown", this.handleKeydown);
  
      // Loại bỏ sự kiện vuốt và kéo
      if (this.hammer) {
        this.hammer.off("swipeleft swiperight panleft panright", this.handleSwipe);
        this.hammer.destroy();
      }
    },
  };
  </script>
  
  <style scoped>
  .carousel-banner {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 500px;
  }
  
  /* Sử dụng opacity thay vì display để có chuyển đổi mượt mà */
  .carousel-item {
    min-width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    z-index: 1;
  }

  
  .carousel-item.active {
    opacity: 1;
    z-index: 2;
    animation: fadeIn 1s ease-in-out;
  }

  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(1.05);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Gradient Overlay để tăng độ tương phản */
  .carousel-item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ); /* Tăng opacity từ 0.3 lên 0.5 */
    z-index: 1;
  }
  
  /* Hình ảnh */
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Nội dung carousel nằm trên overlay */
  .carousel-content {
  position: absolute!important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 51, 102, 0.7)!important; /* Nền màu xanh đậm với độ mờ 70% */
  padding: 30px 20px;
  border-radius: 10px;
  text-align: center;
  color: white!important;
  max-width: 90%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4)!important; /* Bóng đổ để tạo chiều sâu */
  z-index: 2; /* Đảm bảo nội dung nằm trên overlay gradient */
}
  
    .carousel-content h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #ffcc00!important; /* Màu vàng nổi bật */
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8)!important; /* Bóng đổ cho văn bản */
    }
    .carousel-content p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.8)!important; /* Bóng đổ nhẹ cho đoạn văn */
}

/* Nút "Mua ngay" */
  .shop-now-button {
    background-color: #ffcc00;
    color: #003366;
    padding: 14px 28px; /* Tăng padding để nút lớn hơn */
    font-size: 1.1rem; /* Tăng kích thước chữ */
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    font-weight: bold;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3); /* Thêm bóng để nút nổi bật hơn */
  }
  
  .shop-now-button:hover,
  .shop-now-button:focus {
    background-color: #e6b800;
    transform: scale(1.05);
    outline: none; /* Loại bỏ viền mặc định khi focus */
  }
  
  /* Điều khiển chuyển slide */
  .carousel-controls {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
    z-index: 3; /* Đảm bảo điều khiển nằm trên tất cả các thành phần */
  }
  
  .control-button {
    background-color: rgba(0, 51, 102, 0.8);
    color: white;
    border: none;
    padding: 12px;
    cursor: pointer;
    border-radius: 50%;
    font-size: 1.2rem;
    transition: background-color 0.3s, color 0.3s, transform 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Thêm bóng cho nút */
  }
  
  .control-button:hover,
  .control-button:focus {
    background-color: #ffcc00;
    color: #003366;
    transform: scale(1.1);
    outline: none; /* Loại bỏ viền mặc định khi focus */
  }
  
  /* Indicators */
  .carousel-indicators {
    position: absolute;
    bottom: 60px; /* Đặt trên các nút điều khiển */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 3;
  }
  
  .indicator {
    width: 12px;
    height: 12px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .indicator.active {
    background-color: #ffcc00;
    transform: scale(1.2);
  }
  
  /* Toggle Autoplay Button */
  .toggle-autoplay-button {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background-color: rgba(0, 51, 102, 0.8);
    color: white;
    border: none;
    padding: 10px 14px;
    border-radius: 50%;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    z-index: 3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .toggle-autoplay-button:hover,
  .toggle-autoplay-button:focus {
    background-color: #ffcc00;
    color: #003366;
    transform: scale(1.1);
    outline: none;
  }
  
  /* Progress Bar */
  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 4;
  }
  
  .progress {
    height: 100%;
    background-color: #ffcc00;
    width: 0%;
    transition: width 0.1s linear;
  }
  
  /* Responsive Design */
  @media (max-width: 1200px) {
    .carousel-banner {
      height: 450px;
    }
  
    .carousel-content {
      padding: 25px 15px;
    }
  
    .carousel-content h1 {
      font-size: 2.2rem;
    }
  
    .carousel-content p {
      font-size: 1.1rem;
    }
  
    .shop-now-button {
      padding: 12px 24px;
      font-size: 1rem;
    }
  
    .control-button {
      padding: 10px;
      font-size: 1rem;
    }
  
    .carousel-indicators {
      bottom: 50px;
    }
  
    .indicator {
      width: 10px;
      height: 10px;
    }
  
    .toggle-autoplay-button {
      padding: 9px 12px;
      font-size: 0.95rem;
    }
  }
  
  @media (max-width: 1024px) {
    .carousel-banner {
      height: 400px;
    }
  }
  
  @media (max-width: 768px) {
    .carousel-banner {
      height: 350px;
    }
  
    .carousel-content {
      padding: 20px 10px;
    }
  
    .carousel-content h1 {
      font-size: 2rem;
    }
  
    .carousel-content p {
      font-size: 1rem;
    }
  
    .shop-now-button {
      padding: 10px 20px;
      font-size: 0.95rem;
    }
  
    .control-button {
      padding: 8px;
      font-size: 0.9rem;
    }
  
    .carousel-indicators {
      bottom: 45px;
    }
  
    .indicator {
      width: 10px;
      height: 10px;
    }
  
    .toggle-autoplay-button {
      padding: 7px 10px;
      font-size: 0.85rem;
    }
  }
  
  @media (max-width: 576px) {
    .carousel-banner {
      height: 300px;
    }
  
    .carousel-content {
      padding: 15px 8px;
    }
  
    .carousel-content h1 {
      font-size: 1.5rem;
    }
  
    .carousel-content p {
      font-size: 0.9rem;
    }
  
    .shop-now-button {
      padding: 8px 16px;
      font-size: 0.85rem;
    }
  
    .carousel-controls {
      bottom: 15px;
      right: 15px;
    }
  
    .control-button {
      padding: 6px;
      font-size: 0.8rem;
    }
  
    .carousel-indicators {
      bottom: 40px;
    }
  
    .indicator {
      width: 8px;
      height: 8px;
    }
  
    .toggle-autoplay-button {
      padding: 5px 8px;
      font-size: 0.75rem;
    }
  }
  </style>
  