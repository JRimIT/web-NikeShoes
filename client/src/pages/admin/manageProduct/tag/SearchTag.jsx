import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { validateProps } from "@mui/x-data-grid/internals";

const SearchTag = React.memo((props) => {
  const { products, initialProduct, setCategory, setProducts } = props;

  const [listTag, setListTag] = useState([]);

  useEffect(() => {
    if (listTag.length === 0) {
      setProducts(initialProduct);
    } else if (filteredProduct.length > 0) {
      setProducts(filteredProduct);
    } else {
      setProducts([]);
    }
  }, [listTag]);

  const getListTag = (data) => {
    // console.log(data);
    setListTag(data);
    // setCategory(data)
  };

  console.log("List: ", listTag);

  const filteredProduct = useMemo(() => {
    // Kiểm tra nếu `products` là mảng hợp lệ trước khi gọi `filter`
    if (Array.isArray(products) && products.length > 0) {
      return products.filter((product) => {
        const productTags = product.category.split(" ");
        return listTag.every((tag) =>
          productTags.some((pTag) => pTag.includes(tag.title))
        );
      });
    }
    // Nếu `products` không phải là mảng, trả về mảng rỗng
    return [];
  }, [products, listTag]);

  return (
    <Stack spacing={5} sx={{ width: "50vw" }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={allTags}
        getOptionLabel={(option) => option.title}
        // defaultValue={[top100Films[13]]}
        // value={listTag}
        onChange={(event, value) => getListTag(value)}
        onClick={listTag ? filteredProduct : console.log("Not have filter")}
        renderInput={(params) => {
          return (
            <>
              <TextField
                {...params}
                variant="standard"
                label="Tags"
                placeholder="Favorites"
              />
            </>
          );
        }}
      />
    </Stack>
  );
});
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const allTags = [
  { title: "Shoes" },
  { title: "Women" },
  { title: "Men" },
  { title: "Running" },
  { title: "Football" },
  { title: "Tennis" },
  { title: "Basketball" },
  { title: "Golf" },
  { title: "Workout" },
  { title: "Athletics" },
  { title: "Racing" },
  { title: "Trail-Running" },
  { title: "Skate" },
];

export default SearchTag;
