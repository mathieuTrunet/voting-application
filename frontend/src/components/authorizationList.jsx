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
import CheckIcon from "@mui/icons-material/Check";

function AuthorizationList(Props) {
  return (
    <>
      <Typography>{Props.ListType}er une adresse</Typography>
      <Box sx={BoxInputStyle}>
        <TextField label="saisir une adresse" />
        <IconButton sx={IconButtonStyle} color="info">
          <CheckIcon />
        </IconButton>
      </Box>
      <Box sx={BoxListStyle}>
        <List sx={ListStyle}>
          {Props.addressList.map((address) => (
            <ListItem key={address} sx={ListItemStyle}>
              {Props.ListType === "blacklist" ? (
                <PersonOffIcon color="error" fontSize="large" />
              ) : (
                <PersonIcon color="success" fontSize="large" />
              )}
              <ListItemText primary={address} />
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

const ListStyle = {
  width: "100%",
  maxWidth: 650,
  bgcolor: "background.paper",
  position: "relative",
  overflow: "auto",
  maxHeight: 125,
  "& ul": { padding: 0 },
};

const BoxListStyle = {
  border: "1px solid",
  borderRadius: "10px",
  margin: "10px",
  padding: "10px",
  boxShadow: "8px 8px #0c6aaf",
};

const ListItemStyle = {
  border: "1px solid",
  borderRadius: "10px",
  marginY: "3px",
};

const BoxInputStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const IconButtonStyle = {
  border: "3px solid",
  marginX: "15px",
};

export default AuthorizationList;
