import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

import PropositionList from "./propositionList";

const data = ["banane", "pomme", "orange", "boudin noir"];



export default function QuestionManagement() {
  const [phase, setPhase] = useState("input");
  const [isBooleanQuestion, setIsBooleanQuestion] = useState(false);

  return (
    <>
      <QuestionInput phase={phase} />
      <PropositionList propositionList={data} />
      <ButtonPhaseSection phase={phase} />
    </>
  );
}

function QuestionInput(Props) {
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
    </>
  );
}

function ButtonPhaseSection(Props) {
  return (
    <>
      <Box sx={{ marginY: "20px" }}>
        <Button
          sx={ButtonPhaseStyle}
          variant="contained"
          color={Props.phase === "input" ? "info" : "success"}
          startIcon={Props.phase !== "input" && <CheckIcon />}
          disabled={Props.phase === "input" ? false : true}
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
