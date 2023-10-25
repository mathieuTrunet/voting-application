import { SxProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";

function AuthorizationList(Props: { ListType: "blacklist" | "whitelist"; data: any[] }): JSX.Element {
  return (
    <>
      <Typography>{Props.ListType}er une adresse</Typography>
      <TextField label="saisir une adresse" />
      <Box sx={BoxListStyle}>
        <List sx={ListStyle}>
          {Props.data.map((item) => (
            <ListItem key={item} sx={ItemListeStyle}>
              {Props.ListType === "blacklist" ? (
                <PersonOffIcon color="error" fontSize="large" />
              ) : (
                <PersonIcon color="success" fontSize="large" />
              )}
              <ListItemText primary={item} />
              <IconButton>
                <CancelIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

const ListStyle: SxProps = {
  width: "100%",
  maxWidth: 650,
  bgcolor: "background.paper",
  position: "relative",
  overflow: "auto",
  maxHeight: 125,
  "& ul": { padding: 0 },
};

const BoxListStyle: SxProps = {
  border: "1px solid",
  borderRadius: "10px",
  margin: "10px",
  padding: "10px",
  boxShadow: "8px 8px #0c6aaf",
};

const ItemListeStyle: SxProps = {
  border: "1px solid",
  borderRadius: "10px",
  marginY: "3px",
};

export default AuthorizationList;
