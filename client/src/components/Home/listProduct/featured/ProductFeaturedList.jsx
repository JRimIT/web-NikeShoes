import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";
import { FixedSizeGrid as Grid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useNavigate } from "react-router-dom";
import "../Product/ProductList.scss";

const ProductFeaturedList = ({
  featured,
  onTotalProductsChange,
  sortBy,
  filtersVisible,
}) => {
  const GUTTER_SIZE = 5;
  const COLUMN_WIDTH = filtersVisible ? 450 : 410;
  const ROW_HEIGHT = 620;

  const [gridSize, setGridSize] = useState({
    width: window.innerWidth - 300, // Adjust for sidebar width (example: 300px)
    height: window.innerHeight,
  });
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Hàm fetch sản phẩm từ API
  const fetchProducts = () => {
    const url = featured
      ? `http://localhost:5000/products?pro_message_list=${featured}`
      : `http://localhost:5000/products`;

    axios
      .get(url)
      .then((response) => {
        let fetchedProducts = response.data.products;

        // Kiểm tra giá trị `sortBy` và sắp xếp dữ liệu theo giá
        if (sortBy === "price-high-low") {
          fetchedProducts = fetchedProducts.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
        } else if (sortBy === "price-low-high") {
          fetchedProducts = fetchedProducts.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
        }

        setProducts(fetchedProducts);
        onTotalProductsChange(response.data.totalCount);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [featured, sortBy]);

  const isItemLoaded = (index) => index < products.length;

  const loadMoreItems = (startIndex, stopIndex) => {
    return new Promise((resolve) => {
      fetchProducts().then(resolve);
    });
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 3 + columnIndex;
    const product = products[index];

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
      itemCount={products.length + 1}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <Grid
          className="Grid"
          columnCount={filtersVisible ? 3 : 4} // Adjust column count as needed
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
          rowCount={Math.ceil(products.length / 3) + 1}
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

export default ProductFeaturedList;
