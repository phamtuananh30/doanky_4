import React, { useState, useEffect } from "react";
import "./BackToTopButton.scss"; // Tùy chỉnh CSS cho nút

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Hiển thị nút khi cuộn xuống một khoảng cụ thể, ví dụ 200px
      setIsVisible(scrollY > 200);
    };

    // Gắn sự kiện lắng nghe khi cuộn trang
    window.addEventListener("scroll", handleScroll);

    // Hủy bỏ sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Cuộn trang về đầu
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Có thể thay đổi thành 'auto' để cuộn tự nhiên
    });
  };

  return (
    <button
      className={`back-to-top-button ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-up"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
        />
      </svg>
    </button>
  );
};

export default BackToTopButton;
