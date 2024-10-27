import axios from "../../../../utils/axios.customize";
import './ProductList.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, forwardRef } from "react";

import { FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProductList.scss";

const ProductList = ({
  category,
  onTotalProductsChange,
  sortBy,
  filtersVisible,
}) => {
  const GUTTER_SIZE = 5;
  const COLUMN_WIDTH = filtersVisible ? 450 : 410;
  const ROW_HEIGHT = 620;

  const [products, setProducts] = useState([]);
  const [gridSize, setGridSize] = useState({
    width: window.innerWidth - 300, // Adjust for sidebar width (example: 300px)
    height: window.innerHeight,
  });
  const navigate = useNavigate();
  const location = useLocation();

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

    const handleResize = () => {
      setGridSize({
        width: window.innerWidth - 300, // Adjust for sidebar width (example: 300px)
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [category, location.search, sortBy]);

  // Cell component for rendering individual product items
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 3 + columnIndex;
    const product = products[index];
    console.log(product);

    return (
      <div
        className="product-card"
        style={{
          ...style,
          left: style.left + GUTTER_SIZE,
          top: style.top + GUTTER_SIZE,
          width: style.width - GUTTER_SIZE,
          height: style.height - GUTTER_SIZE,
        }}
        onClick={() => product && navigate(`/products/${product.product_id}`)}
      >
        {product ? (
          <>
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
          </>
        ) : (
          "Loading..."
        )}
      </div>
    );
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={products.length + 1} // Add 1 to trigger load more at the end
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <Grid
          className="Grid"
          columnCount={filtersVisible ? 3 : 4}
          columnWidth={COLUMN_WIDTH + GUTTER_SIZE}
          height={filtersVisible ? gridSize.height : window.innerHeight}
          innerElementType={forwardRef(({ style, ...rest }, ref) => (
            <div
              ref={ref}
              style={{
                ...style,
                paddingLeft: GUTTER_SIZE,
                paddingTop: GUTTER_SIZE,
              }}
              {...rest}
            />
          ))}
          rowCount={Math.ceil(products.length / 3) + 1} // +1 to account for loading items
          rowHeight={ROW_HEIGHT + GUTTER_SIZE}
          width={filtersVisible ? gridSize.width : window.innerWidth}
          onItemsRendered={({ overscanStartIndex, overscanStopIndex }) =>
            onItemsRendered({
              overscanStartIndex,
              overscanStopIndex,
            })
          }
          ref={ref}
        >
          {Cell}
        </Grid>
      )}
    </InfiniteLoader>
  );
};

export default ProductList;
