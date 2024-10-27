import React, { useState, useEffect } from "react";
import ProductList from "../Product/ProductList";
import { useParams } from "react-router-dom";
import "../Product/ProductListPage.scss";
import CategoryBar from "../Product/CategoryBar";
import SidebarMen from "./SidebarMen";

function ProductListPageMen() {
  const { category: urlCategory } = useParams(); // Get category from URL
  const [category, setCategory] = useState(urlCategory || ""); // State to hold the selected category
  const [totalProducts, setTotalProducts] = useState(0); // State to hold total products count
  const [filtersVisible, setFiltersVisible] = useState(true); // State for filters visibility
  const [sortBy, setSortBy] = useState("featured");

  // Function to handle category change
  const onCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue); // Cập nhật giá trị sắp xếp khi người dùng chọn
  };

  useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [urlCategory]);

  return (
    <>
      <CategoryBar
        category={category}
        totalProducts={totalProducts}
        onToggleFilters={toggleFilters} // Truyền hàm toggle visibility của filters
        filtersVisible={filtersVisible} // Truyền trạng thái của filters
        onSortChange={handleSortChange} // Truyền hàm thay đổi sắp xếp
      />
      <div className="product-page">
        {filtersVisible && <SidebarMen onCategoryChange={onCategoryChange} />}
        <div className="product-list-container">
          <ProductList
            category={category}
            onTotalProductsChange={setTotalProducts} // Pass function to update total products
            sortBy={sortBy}
            filtersVisible={filtersVisible} // Truyền trạng thái của filters
          />
        </div>
      </div>
    </>
  );
}

export default ProductListPageMen;
