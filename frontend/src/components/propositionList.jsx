import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";

export default function PropositionList(Props) {

  const [propositions, setPropositions] = useState();
  async function getCurrentQuestion() {
    const propositions = await Props.contract.contract._methods.sortProposals().call();
    setPropositions(propositions);
  }

  useEffect(() => {
    getCurrentQuestion();
  }, [])

  return (
    <Box sx={BoxListStyle}>
      <h3>Liste des propositions : </h3>
      <List sx={ListStyle}>
        {propositions?.map((proposition) => (
          <ListItem key={proposition} sx={ListItemStyle}>
            <ListItemText primary={proposition.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const ListStyle = {
  width: 650,
  maxWidth: 650,
  bgcolor: "background.paper",
  position: "relative",
  overflow: "auto",
  maxHeight: 300,
  height: 300,
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
