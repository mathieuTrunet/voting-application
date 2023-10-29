import Box from "@mui/material/Box";

import NavigationBar from "../components/navigationBar";
import AuthorizationList from "../components/authorizationList";
import QuestionManagement from "../components/questionManagement";

const data = [
  "0xAC5074E64crhtrhrthrthegegergregregeae64E",
  "0xAC5074E64c29fergeggreg2cC69717ba7E8ae64E",
  "0xAC5074ztgerggeergreg672cC69717ba7E8ae64E",
];

export default function AdministrationPage(props) {
  return (
    <>
      <NavigationBar />
      <Box sx={MainBoxStyle}>
        <AuthorizationList ListType="whitelist" addressList={data} contract={props.contract}/>
        <AuthorizationList ListType="blacklist" addressList={data} contract={props.contract}/>
        <QuestionManagement contract={props.contract}></QuestionManagement>
      </Box>
    </>
  );
}

const MainBoxStyle = {
  marginTop: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
