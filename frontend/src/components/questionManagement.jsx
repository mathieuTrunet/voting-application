import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import {useEffect, useState} from "react";

import PropositionList from "./propositionList";

const data = ["banane", "pomme", "orange", "boudin noir"];



export default function QuestionManagement(Props) {
  const [phase, setPhase] = useState("input");
  const [isBooleanQuestion, setIsBooleanQuestion] = useState(false);

  return (
    <>
      <QuestionInput phase={phase} contract={Props.contract}/>
      <PropositionList propositionList={data} />
      <ButtonPhaseSection phase={phase} contract={Props.contract}/>
    </>
  );
}

function QuestionInput(Props) {

    function handleWriteQuestion(){
        Props.contract.contract._methods.writeQuestion("coucou").call();
    }

  return (
    <>
      <Box sx={BoxSwitchStyle}>
        <Typography>question à réponse de type oui/non</Typography>
        <Switch disabled={Props.phase === "input" ? false : true} />
      </Box>
      <TextField
        disabled={Props.phase === "input" ? false : true}
        sx={{ width: 650 }}
        label="saisir une question"
      />
        <Button
            sx={ButtonPhaseStyle}
            variant="contained"
            color={Props.phase === "input" ? "info" : "success"}
            startIcon={Props.phase !== "input" && <CheckIcon />}
            onClick={handleWriteQuestion}
        >
            validation
        </Button>
    </>
  );
}



function ButtonPhaseSection(Props) {
    const [currentQuestionState, setCurrentQuestionState] = useState('');
    async function handleQuestionState() {
        await Props.contract.contract._methods.nextState().call();
        const toto = await Props.contract.contract._methods.getState().call();
        console.log(toto);
    }

    useEffect(() =>{
        handleQuestionState();
    },[])


  return (
    <>
      <Box sx={{ marginY: "20px" }}>
          {}
        <Button
          sx={ButtonPhaseStyle}
          variant="contained"
          color={Props.phase === "input" ? "info" : "success"}
          startIcon={Props.phase !== "input" && <CheckIcon />}
          disabled={Props.phase === "input" ? false : true}
          onClick={handleQuestionState}
        >
          validation
        </Button>
        <Button
          sx={ButtonPhaseStyle}
          variant="contained"
          color={Props.phase === "input" ? "inherit" : Props.phase === "validation" ? "info" : "success"}
          startIcon={Props.phase === "vote" && <CheckIcon />}
          disabled={Props.phase === "validation" ? false : true}
        >
          vote
        </Button>
        <Button
          sx={ButtonPhaseStyle}
          variant="contained"
          color={Props.phase === "vote" ? "info" : "inherit"}
          disabled={Props.phase === "vote" ? false : true}
        >
          cloture
        </Button>
        <Button sx={ButtonPhaseStyle} variant="contained" color="error" startIcon={<CancelIcon />}>
          reinitialiser
        </Button>
      </Box>
    </>
  );
}

const ButtonPhaseStyle = {
  marginX: "3px",
};

const BoxSwitchStyle= {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};
