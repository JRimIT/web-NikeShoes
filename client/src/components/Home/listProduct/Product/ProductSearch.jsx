import React, { useState, useEffect } from 'react';
import SearchBar from '../../../header/SearchBar';
import ProductList from './ProductList'; // Import ProductList
import CategoryBar from './CategoryBar';
import { useParams, useLocation } from 'react-router-dom';
import SidebarMen from '../men/SidebarMen';

const ProductSearch = () => {
  const { category: urlCategory } = useParams(); // Lấy category từ URL nếu có
  const [category, setCategory] = useState(urlCategory || ''); // State lưu category
  const [searchTerm, setSearchTerm] = useState(''); // State để lưu từ khóa tìm kiếm
  const [totalProducts, setTotalProducts] = useState(0); // State lưu tổng số sản phẩm
  const [filtersVisible, setFiltersVisible] = useState(true); // State cho visibility của filter
  const [sortBy, setSortBy] = useState('featured'); // State để lưu giá trị sắp xếp
  const location = useLocation();

  const onCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory); // Update the category state
  };

  // Hàm toggle visibility cho bộ lọc (filters)
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible); // Toggle filters visibility
  };

  // Cập nhật category khi URL thay đổi
  useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory); // Update category state khi URL thay đổi
    }
  }, [urlCategory]);

  // Xử lý sự kiện thay đổi sắp xếp
  const handleSortChange = (sortValue) => {
    setSortBy(sortValue); // Cập nhật giá trị sắp xếp khi người dùng chọn
  };

  return (
    <div>
      {/* Tích hợp CategoryBar */}
      <CategoryBar 
        category={category}
        totalProducts={totalProducts}
        onToggleFilters={toggleFilters} // Truyền hàm toggle visibility của filters
        filtersVisible={filtersVisible} // Truyền trạng thái của filters
        onSortChange={handleSortChange} // Truyền hàm thay đổi sắp xếp
      />

      {/* Tích hợp ProductList, truyền cả searchTerm và category */}
      <div className="product-page">
        {filtersVisible && <SidebarMen onCategoryChange={onCategoryChange} />} {/* Conditionally render Sidebar */}
        <div className="product-list-container">
          <ProductList 
            category={category}
            onTotalProductsChange={setTotalProducts} // Pass function to update total products
            sortBy={sortBy} // Truyền giá trị sắp xếp xuống ProductList
          /> 
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
