import React, { useState, useEffect } from "react";
import ProductFeaturedList from "./ProductFeaturedList";
import { useParams } from "react-router-dom";
import '../Product/ProductListPage.scss';
import CategoryFeaturedBar from "./CategoryFeaturedBar";
import SidebarFeatured from "./SidebarFeatured";

function ProductFeaturedPage() {
  const { featured: urlFeatured } = useParams();
  const [featured, setFeatured] = useState(urlFeatured || '');
  const [totalProducts, setTotalProducts] = useState(0);
  const [filtersVisible, setFiltersVisible] = useState(true);

  const onFeaturedChange = (selectedFeatured) => {
    setFeatured(selectedFeatured); 
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  useEffect(() => {
    if (urlFeatured) {
        setFeatured(urlFeatured);
    }
  }, [urlFeatured]);

  return (
    <>
      <CategoryFeaturedBar 
        featured={featured}
        totalProducts={totalProducts} 
        onToggleFilters={toggleFilters} // Pass down the toggle function
        filtersVisible={filtersVisible} // Pass filters visibility state
      />
      <div className="product-page">
        {filtersVisible && <SidebarFeatured onFeaturedChange={onFeaturedChange} />} {/* Conditionally render Sidebar */}
        <div className="product-list-container">
          <ProductFeaturedList 
            featured={featured}
            onTotalProductsChange={setTotalProducts} // Pass function to update total products
          /> 
        </div>
      </div>
    </>
  );
}

export default ProductFeaturedPage;
