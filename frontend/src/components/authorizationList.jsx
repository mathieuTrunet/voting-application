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
import {useEffect, useState} from "react";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json";

function AuthorizationList(Props) {

  const [addressToAddInBlackList, setAddressToAddInBlackList] = useState('');
  async function handleAddToBlackList(){
    const instance =  new Props.contract.web3.eth.Contract(
        Voting.abi,
        Props.contract.contract._address
    );

    let gasEstimate = await Props.contract.contract._methods.addInWhitelist("0xeA98f1140365367c162b05060F2541dd416abCc8").estimateGas({from : Props.contract.accounts[0]})

    let encode = await Props.contract.contract._methods.addInWhitelist("0xeA98f1140365367c162b05060F2541dd416abCc8").encodeABI();

    let tx = await Props.contract.web3.eth.sendTransaction({
      from: Props.contract.accounts[0],
      to: Props.contract.contract._address,
      gas: gasEstimate,
      data: encode,
    });
  }

  async function isWhiteListed(){
    const toto = await Props.contract.contract._methods.isWhitelisted("0xeA98f1140365367c162b05060F2541dd416abCc8").call();
    console.log(toto);
  }

  useEffect(() => {
    console.log(Props.contract.accounts[0]);
    isWhiteListed();
  },[]);

  return (
    <>
      <Typography>{Props.ListType}er une adresse</Typography>
      <Box sx={BoxInputStyle}>
        <TextField label="saisir une adresse" onChange={(e) => setAddressToAddInBlackList(e.target.value)}/>
        <IconButton sx={IconButtonStyle} color="info" onClick={handleAddToBlackList}>
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
