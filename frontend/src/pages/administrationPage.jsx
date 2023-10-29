import Box from "@mui/material/Box";

import NavigationBar from "../components/navigationBar";
import WhiteList from "../components/whiteList.jsx";
import QuestionManagement from "../components/questionManagement";
import BlackList from "../components/blackList.jsx";
import {useEffect, useState} from "react";

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
        <WhiteList addressList={data} contract={props.contract}/>
        <BlackList addressList={data} contract={props.contract}/>
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
