import "./HomePageContent.scss";
import "react-multi-carousel/lib/styles.css";
import ShopBySport from "./listBySport/ShopBySport";
import Poster from "./poster/Poster";
import "./poster/poster.scss";
import { useEffect, useState } from "react";
import axios from "../../utils/axios.customize";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import styles cho carousel
import FeaturedCard from "./listFeature/FeaturedCard";

const HomePageContent = () => {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    axios
      .get("products/best-sellers")
      .then((response) => {
        setBestSellers(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching best sellers:", error);
      });
  }, []);

  const handleProductClick = (id) => {
    // Điều hướng đến trang chi tiết sản phẩm
    window.location.href = `/products/${id}`;
  };

  // Cấu hình responsive cho carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // Số card sẽ trượt mỗi lần
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <div className="best-seller-carousel">
        <h2 className="section-title">Trending This Week</h2>
        <Carousel
          responsive={responsive}
          showDots={true} // Hiển thị dấu chấm dưới carousel
          infinite={true} // Vòng lặp vô hạn
          autoPlay={true} // Tự động chạy
          autoPlaySpeed={3000} // Tốc độ chạy
          keyBoardControl={true}
          customTransition="all 0.5s"
          transitionDuration={500}
          containerClass="carousel-container"
        >
          {bestSellers.map((product) => (
            <FeaturedCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              onProductClick={handleProductClick}
            />
          ))}
        </Carousel>
      </div>
      <ShopBySport></ShopBySport>

      <Poster></Poster>
    </>
  );
};

export default HomePageContent;
