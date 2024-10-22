import React, { useState, useEffect } from "react";
import ProductList from "../Product/ProductList";
import { useParams } from "react-router-dom";
import '../Product/ProductListPage.scss';
import CategoryBar from "../Product/CategoryBar";
import SidebarMen from "./SidebarMen";

function ProductListPageMen() {
  const { category: urlCategory } = useParams();
  const [category, setCategory] = useState(urlCategory || '');
  const [totalProducts, setTotalProducts] = useState(0);
  const [filtersVisible, setFiltersVisible] = useState(true);

  const onCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory); 
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
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
        onToggleFilters={toggleFilters} 
        filtersVisible={filtersVisible} 
      />
      <div className="product-page">
        {filtersVisible && <SidebarMen onCategoryChange={onCategoryChange} />} 
        <div className="product-list-container">
          <ProductList 
            category={category} 
            onTotalProductsChange={setTotalProducts}
          /> 
        </div>
      </div>
    </>
  );
}

export default ProductListPageMen;
