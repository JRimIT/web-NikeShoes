import React, { useState, useEffect } from "react";
import ProductList from "../Product/ProductList";
import { useParams } from "react-router-dom";
import "../Product/ProductListPage.scss";
import CategoryBar from "../Product/CategoryBar";
import SidebarWomen from "./SidebarWomen";

function ProductListPageWomen() {
  const { category: urlCategory } = useParams(); // Get category from URL
  const [category, setCategory] = useState(urlCategory || ""); // State to hold the selected category
  const [totalProducts, setTotalProducts] = useState(0); // State to hold total products count
  const [filtersVisible, setFiltersVisible] = useState(true); // State for filters visibility
  const [sortBy, setSortBy] = useState("featured");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
    if (userData && userData.user_id) {
      setUserId(userData.user_id); // Set userId from userData
    }
  }, []);

  // Function to handle category change
  const onCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory); // Update the category state
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible); // Toggle filters visibility
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue); // Cập nhật giá trị sắp xếp khi người dùng chọn
  };
  useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory); // Update category state when URL changes
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
        {filtersVisible && <SidebarWomen onCategoryChange={onCategoryChange} />}{" "}
        {/* Conditionally render Sidebar */}
        <div className="product-list-container">
          <ProductList
            category={category}
            onTotalProductsChange={setTotalProducts} // Pass function to update total products
            sortBy={sortBy}
            userId={userId} // Pass userId down to ProductList
          />
        </div>
      </div>
    </>
  );
}

export default ProductListPageWomen;
