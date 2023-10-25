import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SuggestionContainer from "./SuggestionContainer/suggestionContainer.tsx";

export default function CurrentSessionContainer() {
    return <>
        <h3>Thème du vote : Amélioration de notre SIRH</h3>
        <div>
            <TextField id="outlined-basic" label="Votre suggestion" variant="outlined" />
            <Button variant="contained">Ajouter</Button>
        </div>
        <SuggestionContainer></SuggestionContainer>
    </>
}