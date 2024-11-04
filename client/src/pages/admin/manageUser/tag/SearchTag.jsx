import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { MockDataCountry } from "../../../../data/admin/mockData";
const SearchTag = (props) => {
  const { users, initialUsers, setInitialUsers, setUsers } = props;
  const [listTag, setListTag] = useState([]);

  useEffect(() => {
    if (listTag.length === 0) {
      console.log("istTag.length === 0");

      setUsers(initialUsers);
    } else if (filteredUser.length > 0) {
      console.log("filteredUser.length > 0");

      setUsers(filteredUser);
    } else {
      setUsers([]);
      console.log("eo co user nao");
    }
  }, [listTag]);

  console.log("List: ", listTag);

  const getListTag = (data) => {
    console.log(data);
    setListTag(data);
  };

  const filteredUser = useMemo(() => {
    if (Array.isArray(users) && users.length > 0) {
      return users.filter((user) => {
        const city = user.city.toLowerCase();

        return listTag.every((tag) => city.includes(tag.name.toLowerCase()));
      });
    }
    return [];
  }, [users, listTag]);

  return (
    <Stack spacing={5} sx={{ width: "10vw" }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={MockDataCountry}
        getOptionLabel={(option) => option.name}
        // value={listTag}
        onChange={(event, value) => getListTag(value)}
        renderInput={(params) => {
          return (
            <>
              <TextField
                {...params}
                variant="standard"
                label="City"
                placeholder="Choose"
              />
            </>
          );
        }}
      />
    </Stack>
  );
};

export default SearchTag;
