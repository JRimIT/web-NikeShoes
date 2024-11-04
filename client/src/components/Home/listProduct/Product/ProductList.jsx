import axios from "../../../../utils/axios.customize";

import { useNavigate, useLocation } from "react-router-dom";
import { IoHeartCircleSharp } from "react-icons/io5";

const ProductList = ({ category, onTotalProductsChange, sortBy, userId }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin URL hiện tại

  // Fetch the wishlist for the user
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token"); // or however you retrieve the token
      const response = await axios.get(
        `http://localhost:5000/api/wishlist/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(response.data.map((item) => item.product_id));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  // Function to get search term from URL
  const getSearchTermFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get("term") || "";
  };

  // Function to fetch products
  const fetchProducts = () => {
    const searchTerm = getSearchTermFromURL(); // Lấy từ khóa tìm kiếm từ URL
    let url = `http://localhost:5000/products`;

    // Nếu có cả category và searchTerm, truyền cả hai
    if (category && searchTerm) {
      url = `http://localhost:5000/products?category=${category}&term=${searchTerm}`;
    } else if (category) {
      // Chỉ lọc theo category
      url = `http://localhost:5000/products?category=${category}`;
    } else if (searchTerm) {
      // Chỉ tìm kiếm theo searchTerm
      url = `http://localhost:5000/products/search?term=${searchTerm}`;
    }

    axios
      .get(url)
      .then((response) => {
        let fetchedProducts = response.data.products;

        // Kiểm tra giá trị sortBy và áp dụng sắp xếp hoặc lọc dữ liệu
        if (sortBy === "featured") {
          // Sắp xếp sản phẩm sao cho những sản phẩm có `pro_message_list` lên trước
          fetchedProducts = fetchedProducts.sort((a, b) => {
            if (a.pro_message_list && !b.pro_message_list) return -1;
            if (!a.pro_message_list && b.pro_message_list) return 1;
            return 0; // Nếu cả hai đều có hoặc đều không có, giữ nguyên thứ tự
          });
        } else if (sortBy === "price-high-low") {
          fetchedProducts = fetchedProducts.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
        } else if (sortBy === "price-low-high") {
          fetchedProducts = fetchedProducts.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
        } else if (sortBy === "newest") {
          // Sắp xếp theo newest với ưu tiên các sản phẩm có pro_message_list là "Just In"
          fetchedProducts = fetchedProducts.sort((a, b) => {
            if (
              a.pro_message_list === "Just In" &&
              b.pro_message_list !== "Just In"
            )
              return -1;
            if (
              a.pro_message_list !== "Just In" &&
              b.pro_message_list === "Just In"
            )
              return 1;

            // Nếu không phải "Just In", sắp xếp theo release_date (mới nhất trước)
          });
        }

        setProducts(fetchedProducts);
        onTotalProductsChange(response.data.totalCount);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  // Function to check if an item is loaded
  const isItemLoaded = (index) => index < products.length;

  // Function to load more items
  const loadMoreItems = (startIndex, stopIndex) => {
    return new Promise((resolve) => {
      fetchProducts(startIndex, stopIndex).then(resolve);
    });
  };

  // Effect to handle initial fetch and resize
  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [category, location.search, sortBy, userId]); // Gọi lại khi có thay đổi trong category, searchTerm hoặc sortBy

  const isProductInWishlist = (productId) => wishlist.includes(productId);

  return (
    <div className="product-container">
      {products.map((product) => (
        <div
          className="product-card"
          key={product.product_id}
          onClick={() => navigate(`/products/${product.product_id}`)}
        >
          {isProductInWishlist(product.product_id) && (
            <span className="wishlist-icon">
              <IoHeartCircleSharp className="h-5 w-5" />
            </span>
          )}
          <img
            src={product.primary_image}
            alt={product.name}
            className="product-image"
          />
          <h5 className="product-featured">{product.pro_message_list}</h5>
          <h6 className="product-name">{product.name}</h6>
          <h6 className="product-category">{product.category}</h6>
          <h6 className="product-color">{product.color}</h6>
          <p className="product-price">
            {product.price
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(parseFloat(product.price.replace(/,/g, "")))
              : "Price not available"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
