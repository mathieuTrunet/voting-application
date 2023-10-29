import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import {useEffect, useState} from "react";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json";

function BlackList(Props) {

    const [addressToAddInBlackList, setAddressToAddInBlackList] = useState('');
    const [BlackListedAccounts, setBlackListedAccounts] = useState();

    async function handleAddToBlackList(address) {
        if (address) {
            setAddressToAddInBlackList(address)
        }
        const instance = new Props.contract.web3.eth.Contract(
            Voting.abi,
            Props.contract.contract._address
        );

        let gasEstimate = await Props.contract.contract._methods.addInBlacklist(addressToAddInBlackList).estimateGas({from: Props.contract.accounts[0]})

        let encode = await Props.contract.contract._methods.addInBlacklist(addressToAddInBlackList).encodeABI();

        let tx = await Props.contract.web3.eth.sendTransaction({
            from: Props.contract.accounts[0],
            to: Props.contract.contract._address,
            gas: gasEstimate,
            data: encode,
        });

        setBlackListedAccounts2();
    }

    async function setBlackListedAccounts2() {
        const BlackListedAccounts = await Props.contract.contract._methods.getBlacklisted().call();
        setBlackListedAccounts(BlackListedAccounts);
    }

    useEffect(() => {
        setBlackListedAccounts2();
    }, []);

    return (
        <>
            <Typography>Blacklister une adresse</Typography>
            <Box sx={BoxInputStyle}>
                <TextField label="saisir une adresse" onChange={(e) => setAddressToAddInBlackList(e.target.value)}/>
                <IconButton sx={IconButtonStyle} color="info" onClick={() => handleAddToBlackList("")}>
                    <CheckIcon/>
                </IconButton>
            </Box>
            <Box sx={BoxListStyle}>
                <List sx={ListStyle}>
                    {BlackListedAccounts?.map((address) => (
                        <ListItem sx={ListItemStyle}>
                            <PersonOffIcon color="error" fontSize="large"/>
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

export default BlackList;
