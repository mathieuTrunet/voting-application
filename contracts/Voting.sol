// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable(msg.sender){

    //event
    event NewProposal(uint propositionID, string description, uint voteCount);
    event Authorized(address _address);

    //mapping
    mapping(address => bool) whitelist;
    mapping(address => bool) blacklist;
    mapping (uint => address) public voterToOwnerAdress;

    //variables
    Proposal[] public propositions;
    Whitelist[] public whitelistedlist;
    Blacklist[] public blacklistedlist;
    Voter[] public voters;
    Question public question;
    uint private voterCount;

    WorkflowStatus public questionState = WorkflowStatus.QuestionDescription;

    //structures
    struct Whitelist{
        address theAddress;
    }
    struct Blacklist{
        address theAddress;
    }
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }
    struct Question {
        string description;
        bool isYesNo;
    }
    struct Proposal {
        string description;
        uint voteCount;
    }

    enum WorkflowStatus {
        QuestionDescription,
        ProposalsRegistration,
        VotingSession,
        VotesTallied
    }


    //Check whitelist / blackList
    /*modifier check(){
        require (whitelist[msg.sender]==true, "you are not authorized");
        require (blacklist[msg.sender]!=true, "you are not authorized");
        _;
    }*/

    //gestion blacklist/whitelist
    function delFromBlacklist(address _address) public onlyOwner {
        blacklist[_address] = false;
        for (uint key = 0; key < blacklistedlist.length; key++){
            if(blacklistedlist[key].theAddress == _address){
                delete blacklistedlist[key];
            }
        }

        emit Authorized(_address);
    }
    function addInBlacklist(address _address) public onlyOwner {
        blacklist[_address] = true;
        whitelist[_address] = false;
        blacklistedlist.push(Blacklist(_address));
        emit Authorized(_address);
    }
    function delFromWhitelist(address _address) public onlyOwner {
        whitelist[_address] = false;
        for (uint key = 0; key < whitelistedlist.length; key++){
            if(whitelistedlist[key].theAddress == _address){
                delete whitelistedlist[key];
            }
        }

        emit Authorized(_address);
    }
    function addInWhitelist(address _address) public onlyOwner {
        whitelist[_address] = true;
        blacklist[_address] = false;
        whitelistedlist.push(Whitelist(_address));
        emit Authorized(_address);
    }
    function isWhitelisted(address _address) public view returns(bool){
        return whitelist[_address];
    }
    function isBlacklisted(address _address) public view returns(bool){
        return blacklist[_address];
    }
    function getWhitelisted() public view returns (Whitelist[] memory){
        return whitelistedlist;
    }
    function getBlacklisted() public view returns (Blacklist[] memory){
        return blacklistedlist;
    }

    //Écrire la question (admin)
    function writeQuestion(string memory _question, bool _yesno) public {
        require(bytes(question.description).length == 0, "Il faut d'abord recommencer le questionnaire.");
        require (bytes(_question).length != 0, "le champ est vide");
        question.description = _question;
        question.isYesNo = _yesno;
        if(question.isYesNo == true){
            propositions.push(Proposal("Oui",uint(0)));
            propositions.push(Proposal("Non",uint(0)));
        }
    }

    //Ajoute une proposition
    function addProposal(string memory _description) public {
        require (questionState == WorkflowStatus.ProposalsRegistration, "Ce n'est pas le bon etat");
        require (bytes(_description).length != 0, "le champ est vide");
        propositions.push(Proposal(_description,uint(0)));
    }


    //Restart le questionnaire
    function restart() public onlyOwner {
        //Vider ce qui doit-être vider
        question.description = "";
        question.isYesNo = false;
        delete propositions;
        delete voters;
        questionState = WorkflowStatus.QuestionDescription;
        delete whitelistedlist;
        delete blacklistedlist;

        //vide le mapping
        uint[] memory keys = new uint[](voterCount);
        uint length = 0;
        for (uint key = 0; key < voters.length; key++) {
            keys[length] = key;
            length++;
        }

        for (uint i = 0; i < length; i++) {
            delete voterToOwnerAdress[keys[i]];
        }

        voterCount = 0;
    }

    //Passe au state suivant
    function nextState() public onlyOwner {
        if (questionState == WorkflowStatus.QuestionDescription && question.isYesNo == false){
            questionState = WorkflowStatus.ProposalsRegistration;
        } else if(questionState == WorkflowStatus.QuestionDescription && question.isYesNo == true){
            questionState = WorkflowStatus.VotingSession;
        } else if (questionState == WorkflowStatus.ProposalsRegistration){
            questionState = WorkflowStatus.VotingSession;
        } else if (questionState == WorkflowStatus.VotingSession){
            questionState = WorkflowStatus.VotesTallied;
        }
    }

    //Retourne le State
    function getState() public view returns(string memory){
        string memory etat;
        if (questionState == WorkflowStatus.QuestionDescription){
            etat = "etape 1 : Ecrivez la question";
        } else if (questionState == WorkflowStatus.ProposalsRegistration){
            etat = "etape 2 : Ecrivez les propositions";
        } else if (questionState == WorkflowStatus.VotingSession){
            etat = "etape 3 : Entrez les votes";
        }else if (questionState == WorkflowStatus.VotesTallied){
            etat = "etape 4 : Decouvrez les resultats";
        }
        return etat;
    }
    function getQuestion() public view returns(string memory){
        return question.description;
    }
    function getTypeQuestion() public view returns(bool){
        return question.isYesNo;
    }

    // Trier les propositions par ordre décroissant de voteCount
    function sortProposals() public view returns (Proposal[] memory) {
        uint n = propositions.length;
        Proposal[] memory proposalSorted = propositions;
        for (uint i = 0; i < n - 1; i++) {
            for (uint j = 0; j < n - i - 1; j++) {
                if (proposalSorted[j].voteCount < proposalSorted[j + 1].voteCount) {
                    // Exchange the proposals
                    Proposal memory temp = proposalSorted[j];
                    proposalSorted[j] = proposalSorted[j + 1];
                    proposalSorted[j + 1] = temp;
                }
            }
        }
        return proposalSorted;
    }

    // Obtenir les descriptions triées par ordre décroissant
    function getSortedDescriptions() public view returns (string[] memory) {
        Proposal[] memory proposalSorted;
        proposalSorted = sortProposals();
        string[] memory sortedDescriptions = new string[](proposalSorted.length);
        for (uint i = 0; i < proposalSorted.length; i++) {
            sortedDescriptions[i] = proposalSorted[i].description;
        }
        return sortedDescriptions;
    }

    // Obtenir les descriptions triées par ordre décroissant
    function getSortedCount() public view returns (uint[] memory) {
        Proposal[] memory proposalSorted;
        proposalSorted = sortProposals();
        uint[] memory sortedCount = new uint[](proposalSorted.length);
        for (uint i = 0; i < proposalSorted.length; i++) {
            sortedCount[i] = proposalSorted[i].voteCount;
        }
        return sortedCount;
    }

    //Ajoute un vote
    function vote(uint _proposalPosition) public {
        require(whitelist[msg.sender] == true, "vous n'etes pas autorise a voter");
        require(blacklist[msg.sender] == false, "vous n'etes pas autorise a voter");
        bool dansIf = false;
        uint position;
        for (uint key = 0; key < voters.length; key++) {
            if(voterToOwnerAdress[key] == msg.sender){
                position = key;
                dansIf = true;
            }
        }
        if(dansIf == true){
            require(voters[position].hasVoted != true, "Vous avez deja vote.");
        }

        uint id = voters.length;
        voters.push(Voter(true, true, _proposalPosition));
        voterToOwnerAdress[id] = msg.sender;
        voterCount++;

        propositions[_proposalPosition].voteCount++;
    }

    //retourne le gagnant
    function getStats() public view returns (string[] memory, uint[] memory) {
        return (getSortedDescriptions(), getSortedCount());
    }
}