import React, { useState, useEffect } from "react";
import ProductList from "../Product/ProductList";
import { useParams } from "react-router-dom";
import '../Product/ProductListPage.scss';
import CategoryBar from "../Product/CategoryBar";
import SidebarMen from "./SidebarMen";

function ProductListPageMen() {
  const { category: urlCategory } = useParams(); // Get category from URL
  const [category, setCategory] = useState(urlCategory || ''); // State to hold the selected category
  const [totalProducts, setTotalProducts] = useState(0); // State to hold total products count
  const [filtersVisible, setFiltersVisible] = useState(true); // State for filters visibility
  // Function to handle category change
  const onCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory); // Update the category state
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible); // Toggle filters visibility
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
        onToggleFilters={toggleFilters} // Pass down the toggle function
        filtersVisible={filtersVisible} // Pass filters visibility state
      />
      <div className="product-page">
        {filtersVisible && <SidebarMen onCategoryChange={onCategoryChange} />} {/* Conditionally render Sidebar */}
        <div className="product-list-container">
          <ProductList 
            category={category} 
            onTotalProductsChange={setTotalProducts} // Pass function to update total products
          /> 
        </div>
      </div>
    </>
  );
}

export default ProductListPageMen;
