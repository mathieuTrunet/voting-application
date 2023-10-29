import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import LinearWithValueLabel from "../../../../components/ProgressBar.jsx";
import {useState, useEffect} from "react";
export default function SuggestionContainer(props) {

    const suggestions = [
        {
            id: 1,
            content: "Voici une suggestion utile.",
            approved: false,
            sender: "John Doe"
        },
        {
            id: 2,
            content: "Une autre suggestion intéressante.",
            approved: false,
            sender: "Jane Smith"
        },
        {
            id: 3,
            content: "Une suggestion approuvée.",
            approved: false,
            sender: "Alice Johnson"
        }
    ];

    const WorkflowStatus = {
        RegisteringVoters : "RegisteringVoters",
        ProposalsRegistrationStarted : "ProposalsRegistrationStarted",
        ProposalsRegistrationEnded : "ProposalsRegistrationEnded",
        VotingSessionStarted : "VotingSessionStarted",
        VotingSessionEnded : "VotingSessionEnded",
        VotesTallied : "VotesTallied"
    }

    const currentState = WorkflowStatus.VotingSessionStarted;

    const [suggestions2, setSuggestions] = useState('');
    const [state, setState] = useState();

    async function setCurrentState() {
        // eslint-disable-next-line react/prop-types
        const test = await props?.contract?.contract?._methods?.getState().call();
        console.log(test);
    }

    useEffect(() => {
        // setState(props.contract._methods.getState().call);
        setCurrentState();
    },[]);

    return(
        <div>
            {
                suggestions.map((suggestion, index) =>
                    <div key={suggestion.id} style={{display:'flex'}}>
                        <span>{index + 1} - </span>
                        <div>
                            <div>Suggestion de : {suggestion.sender}</div>
                            {currentState == WorkflowStatus.VotingSessionStarted ? <Checkbox aria-label="suggestion-approved" checked={suggestion.approved}/> : null}
                            <span>{suggestion.content}</span>
                            {currentState == WorkflowStatus.VotesTallied ? <LinearWithValueLabel></LinearWithValueLabel> : null}
                        </div>
                    </div>
                )
            }
            {currentState == WorkflowStatus.VotingSessionStarted ? <Button variant="contained">Valider votre vote</Button> : null}
        </div>
    );
}