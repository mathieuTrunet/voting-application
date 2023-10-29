import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import {useEffect, useState} from "react";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json";

function WhiteList(Props) {

    const [addressToAddInWhiteList, setAddressToAddInWhiteList] = useState('');
    const [whiteListedAccounts, setWhiteListedAccounts] = useState();

    async function handleAddToWhiteList(address) {
        if (address) {
            setAddressToAddInWhiteList(address)
        }
        const instance = new Props.contract.web3.eth.Contract(
            Voting.abi,
            Props.contract.contract._address
        );

        let gasEstimate = await Props.contract.contract._methods.addInWhitelist(addressToAddInWhiteList).estimateGas({from: Props.contract.accounts[0]})

        let encode = await Props.contract.contract._methods.addInWhitelist(addressToAddInWhiteList).encodeABI();

        let tx = await Props.contract.web3.eth.sendTransaction({
            from: Props.contract.accounts[0],
            to: Props.contract.contract._address,
            gas: gasEstimate,
            data: encode,
        });

        setWhiteListedAccounts2();
    }

    async function setWhiteListedAccounts2() {
        const whiteListedAccounts = await Props.contract.contract._methods.getWhitelisted().call();
        setWhiteListedAccounts(whiteListedAccounts);
    }

    useEffect(() => {
        setWhiteListedAccounts2();
    }, []);

    return (
        <>
            <Typography>Whitelister une adresse</Typography>
            <Box sx={BoxInputStyle}>
                <TextField label="saisir une adresse" onChange={(e) => setAddressToAddInWhiteList(e.target.value)}/>
                <IconButton sx={IconButtonStyle} color="info" onClick={() => handleAddToWhiteList("")}>
                    <CheckIcon/>
                </IconButton>
            </Box>
            <Box sx={BoxListStyle}>
                <List sx={ListStyle}>
                    {whiteListedAccounts?.map((address) => (
                        <ListItem sx={ListItemStyle}>

                            <PersonIcon color="success" fontSize="large"/>

                            <ListItemText primary={address.theAddress}/>
                            <IconButton>
                                <CancelIcon/>
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
    "& ul": {padding: 0},
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

export default WhiteList;
