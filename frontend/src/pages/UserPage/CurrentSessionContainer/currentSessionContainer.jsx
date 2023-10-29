import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SuggestionContainer from "./SuggestionContainer/suggestionContainer.jsx";

export default function CurrentSessionContainer(props) {


    return (
        <div>
            <h3>Thème du vote : Amélioration de notre SIRH</h3>
            <div>
                <TextField id="outlined-basic" label="Votre suggestion" variant="outlined" />
                <Button variant="contained">Ajouter</Button>
            </div>
            <SuggestionContainer contract={props.contract}></SuggestionContainer>
        </div>
        )

}