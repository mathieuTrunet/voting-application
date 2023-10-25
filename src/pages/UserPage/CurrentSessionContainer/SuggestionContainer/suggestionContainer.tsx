import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import LinearWithValueLabel from "../../../../components/ProgressBar.tsx";
export default function SuggestionContainer() {

    const suggestions: Suggestion[] = [
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

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    const currentState = WorkflowStatus.VotingSessionStarted;

    return(
        <div>
            {
                suggestions.map((suggestion, index) =>
                    <div key={suggestion.id}>
                        <span>{index + 1}</span>
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