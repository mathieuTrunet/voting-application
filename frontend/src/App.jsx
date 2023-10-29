import React, {Component} from "react";
import Voting from "./artifacts/contracts/Voting.sol/Voting.json";
import getWeb3 from "./getWeb3";
import AdministrationPage from "./pages/administrationPage.jsx";
import UserPage from "./pages/UserPage/userPage.jsx";

class App extends Component {
    state = {
        web3: null,
        accounts: null,
        contract: null,
        userAddress: null,
        isOwner: false,
    };

    async componentDidMount() {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3()

            // Use web3 to get the user's accounts.
            /* on récupère le tableau des comptes sur le metamask du user */
            const accounts = await web3.eth.getAccounts()



            /* Création de l'objet de contrat avec l'abi et l'addresse du contrat  */
            const instance = new web3.eth.Contract(
                Voting.abi,
                "0x123bbf30f4a8ca80d072352189adab58dbb44502"
            )

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3 : web3, accounts : accounts, contract: instance })
            let account = accounts[0]

            this.setState({
                userAddress: account.slice(0, 6) + "..." + account.slice(38, 42),
            })

            // Check if the user is the owner
            const owner = await instance.methods.owner().call()
            if (account === owner) {
                this.setState({
                    isOwner: true,
                })
            }

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            )
            console.error(error)
        }
    }

    render() {
        return (
            <div className="App">
                {this.state.isOwner ? <AdministrationPage contract = {this.state}></AdministrationPage> : <UserPage contract = {this.state}></UserPage>}
            </div>
        );
    }
}

export default App;
