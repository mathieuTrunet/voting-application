import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";

export default function PropositionList(Props: { propositionList: string[] }) {
  return (
    <Box sx={BoxListStyle}>
      <List sx={ListStyle}>
        {Props.propositionList.map((proposition) => (
          <ListItem key={proposition} sx={ListItemStyle}>
            <ListItemText primary={proposition} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const ListStyle: SxProps = {
  width: 650,
  maxWidth: 650,
  bgcolor: "background.paper",
  position: "relative",
  overflow: "auto",
  maxHeight: 300,
  height: 300,
  "& ul": { padding: 0 },
};

const BoxListStyle: SxProps = {
  border: "1px solid",
  borderRadius: "10px",
  margin: "10px",
  padding: "10px",
  boxShadow: "8px 8px #0c6aaf",
};

const ListItemStyle: SxProps = {
  border: "1px solid",
  borderRadius: "10px",
  marginY: "3px",
};
