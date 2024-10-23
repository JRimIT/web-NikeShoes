import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import ListHint from './listHintFromInput';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';

const Search= React.memo((props) =>{
   const {
    products,
    initialProduct,
    setCategory,
    setProducts,
    
  } = props

  const hintForSearch = products.map(product => ({
      id: product.id,
      title: product.name,
      image: product.primary_image

  }))

  const [listTag, setListTag] = useState("")
  
  useEffect(() => {
    if (listTag.length === 0) {
      setProducts(initialProduct)
    }
    else if (filteredProduct.length > 0) {
      setProducts(filteredProduct);
    }else{
      setProducts("")
    }
  }, [listTag]);

  const getListTag = (data) => {
    // console.log(data);
    setListTag(data?data.title:"")
    // setCategory(data)
  }
  
  
  console.log(" listTag: ", listTag.length);
  console.log(typeof listTag);
  
 const filteredProduct = useMemo(() => {
    // Kiểm tra nếu `products` là mảng hợp lệ trước khi gọi `filter`
    if (Array.isArray(products) && products.length > 0) {
      return products.filter((product) => {
        const productTags = product.name.split(' ');
        return listTag.split(' ').every((tag) =>
          productTags.some((pTag) => pTag.includes(tag))
        );
      });
    }
    // Nếu `products` không phải là mảng, trả về mảng rỗng
    return [];
  }, [products, listTag]);



  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={hintForSearch}
        getOptionLabel={(option) => option.title}
         // filterOptions để kiểm soát gợi ý xuất hiện dựa trên input
        filterOptions={(options, { inputValue }) => {
          if (!inputValue) {
            // Nếu input rỗng, chỉ hiển thị 5 mục đầu tiên
            return options.slice(0, 5);
          }
          // Nếu có input, lọc theo giá trị người dùng nhập và hiển thị tất cả kết quả khớp
          return options.filter((option) =>
            option.title.toLowerCase().includes(inputValue.toLowerCase())
          ).slice(0, 10);
        }}

         onChange={(event, value)=> getListTag(value)}
        onClick={listTag ? filteredProduct : console.log("Not have filter")}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {<ListHint product = {option}></ListHint>}
            {/* <img src={option.image} alt="" /> */}
            {/* {option.title} */}
          </li>
            
        )}
        renderInput={(params) => <TextField {...params} label="Search Name Product" />}
      />
    </Stack>
  );
}
)



export default Search