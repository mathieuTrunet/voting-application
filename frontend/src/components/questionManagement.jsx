import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import {useEffect, useState} from "react";

import PropositionList from "./propositionList";
import Voting from "../artifacts/contracts/Voting.sol/Voting.json";

export default function QuestionManagement(Props) {

    const [question, setQuestion] = useState();

    async function getCurrentQuestion() {
        // eslint-disable-next-line react/prop-types
        const question = await Props.contract.contract._methods.getQuestion().call();
        setQuestion(question);
    }

    useEffect(() => {
        getCurrentQuestion();
    }, [])

    return (
        <>
            <QuestionInput contract={Props.contract}/>
            {question?.length > 0 ?
                <>
                    <PropositionList contract={Props.contract}/>
                    <ButtonPhaseSection contract={Props.contract}/>
                </>
                : <></>}
        </>
    );
}

function QuestionInput(Props) {

    const [questionFromContract, setQuestionFromContract] = useState();
    const [question, setQuestion] = useState();
    const [switchState, setSwitchState] = useState(false);
    let hide = false;
    async function handleWriteQuestion() {
        const instance = new Props.contract.web3.eth.Contract(
            Voting.abi,
            Props.contract.contract._address
        );

        let gasEstimate = await Props.contract.contract._methods.writeQuestion(question, switchState).estimateGas({from: Props.contract.accounts[0]})

        let encode = await Props.contract.contract._methods.writeQuestion(question, switchState).encodeABI();

        let tx = await Props.contract.web3.eth.sendTransaction({
            from: Props.contract.accounts[0],
            to: Props.contract.contract._address,
            gas: gasEstimate,
            data: encode,
        });

        hide = true;
    }

    async function getCurrentQuestion() {
        const question = await Props.contract.contract._methods.getQuestion().call();
        setQuestion(question);
        setQuestionFromContract(question);
    }

    useEffect(() => {
        if (question?.length === 0) {
            hide = false;
        }
        getCurrentQuestion();
    }, [])

    if (!questionFromContract) {
        return (
            <>
                <Box sx={BoxSwitchStyle}>
                    <Typography>question à réponse de type oui/non</Typography>
                    <Switch onChange={() => setSwitchState(prevState => !prevState)}/>
                </Box>

                <TextField
                    sx={{width: 650}}
                    label="saisir une question"
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                    sx={ButtonPhaseStyle}
                    variant="contained"
                    color={Props.phase === "input" ? "info" : "success"}
                    startIcon={Props.phase !== "input" && <CheckIcon/>}
                    onClick={handleWriteQuestion}
                >
                    enregistrer
                </Button>
            </>
        )
    } else {
        return <>
            <h3>Question en cours : {question}</h3>
        </>
    }
}


function ButtonPhaseSection(Props) {
    const [currentQuestionState, setCurrentQuestionState] = useState('');

    async function handleQuestionState() {

        const instance = new Props.contract.web3.eth.Contract(
            Voting.abi,
            Props.contract.contract._address
        );

        let gasEstimate = await Props.contract.contract._methods.nextState().estimateGas({from: Props.contract.accounts[0]})

        let encode = await Props.contract.contract._methods.nextState().encodeABI();

        let tx = await Props.contract.web3.eth.sendTransaction({
            from: Props.contract.accounts[0],
            to: Props.contract.contract._address,
            gas: gasEstimate,
            data: encode,
        });

        const nextState = await Props.contract.contract._methods.getState().call();
        setCurrentQuestionState(nextState);
    }

    async function getCurrentState() {
        const currentStateName = await Props.contract.contract._methods.getState().call();
        setCurrentQuestionState(currentStateName);
        console.log(currentStateName);
    }

    async function resetQuestion() {
        const instance = new Props.contract.web3.eth.Contract(
            Voting.abi,
            Props.contract.contract._address
        );

        let gasEstimate = await Props.contract.contract._methods.restart().estimateGas({from: Props.contract.accounts[0]})

        let encode = await Props.contract.contract._methods.restart().encodeABI();

        let tx = await Props.contract.web3.eth.sendTransaction({
            from: Props.contract.accounts[0],
            to: Props.contract.contract._address,
            gas: gasEstimate,
            data: encode,
        });
    }

    useEffect(() => {
        getCurrentState();
    }, [])


    return (
        <>
            <Box sx={{marginY: "20px"}}>
                {}
                <Button
                    sx={ButtonPhaseStyle}
                    variant="contained"
                    color={Props.phase === "input" ? "info" : "success"}
                    startIcon={Props.phase !== "input" && <CheckIcon/>}
                    disabled={currentQuestionState === "etape 1 : Ecrivez la question" ? false : true}
                    onClick={handleQuestionState}
                >
                    validation
                </Button>
                <Button
                    sx={ButtonPhaseStyle}
                    variant="contained"
                    color={Props.phase === "input" ? "inherit" : Props.phase === "validation" ? "info" : "success"}
                    startIcon={Props.phase === "vote" && <CheckIcon/>}
                    disabled={currentQuestionState === "etape 2 : Ecrivez les propositions" ? false : true}
                    onClick={handleQuestionState}
                >
                    vote
                </Button>
                <Button
                    sx={ButtonPhaseStyle}
                    variant="contained"
                    color={Props.phase === "vote" ? "info" : "inherit"}
                    disabled={currentQuestionState === "etape 3 : Entrez les votes" ? false : true}
                    onClick={handleQuestionState}
                >
                    cloture
                </Button>
                <Button sx={ButtonPhaseStyle} variant="contained" color="error" startIcon={<CancelIcon/>}
                        onClick={resetQuestion}>
                    reinitialiser
                </Button>
            </Box>
        </>
    )
        ;
}

const ButtonPhaseStyle = {
    marginX: "3px",
};

const BoxSwitchStyle = {
    display: "flex",
    flexDirection : "row",
    alignItems : "center",
};
