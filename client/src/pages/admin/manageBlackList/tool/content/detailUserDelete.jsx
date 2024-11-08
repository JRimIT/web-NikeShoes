import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AlignItem(props) {
  const { data } = props;
  return (
    <List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={data?.user_image} />
        </ListItemAvatar>
        <ListItemText
          primary={data?.username}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "inline" }}
              ></Typography>
              {data?.email}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
