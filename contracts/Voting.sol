// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting{

    //event
    event NewProposal(uint propositionID, string description, uint voteCount);
    event Authorized(address _address);

    //mapping
    mapping(address=> bool) whitelist;
    mapping(address=> bool) blacklist;
    mapping (uint => address) public voterToOwnerAdress;

    //variables
    Proposal[] public propositions;
    Voter[] public voters;
    Question public question;
    address public owner;
    uint private voterCount;

    WorkflowStatus public questionState = WorkflowStatus.QuestionDescription;

    //structures
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

    constructor() {
        owner = msg.sender;
        whitelist[owner]= true;
        questionState = WorkflowStatus.QuestionDescription;

    }

    //Check whitelist / blackList
    modifier check(){
        require (whitelist[msg.sender]==true, "you are not authorized");
        require (blacklist[msg.sender]!=true, "you are not authorized");
        _;
    }

    //gestion blacklist/whitelist
    function delFromBlacklist(address _address) public check {
        blacklist[_address] = false;
        emit Authorized(_address);
    }
    function addInBlacklist(address _address) public check {
        blacklist[_address] = true;
        whitelist[_address] = false;
        emit Authorized(_address);
    }
    function delFromWhitelist(address _address) public check {
        whitelist[_address] = false;
        emit Authorized(_address);
    }
    function addInWhitelist(address _address) public check {
        whitelist[_address] = true;
        blacklist[_address] = false;
        emit Authorized(_address);
    }
    function isWhitelisted(address _address) public view returns(bool){
        return whitelist[_address];
    }
    function isBlacklisted(address _address) public view returns(bool){
        return blacklist[_address];
    }

    //Écrire la question (admin)
    function writeQuestion(string memory _question) public {
        require(bytes(question.description).length == 0, "Il faut d'abord recommencer le questionnaire.");
        require (bytes(_question).length != 0, "le champ est vide");
        question.description = _question;
        //recupérer la case a cocher question.isYesNo = ?
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
    function restart() public {
        //Vider ce qui doit-être vider
        require(msg.sender == owner, "Vous n'etes pas autorise");
        question.description = "";
        question.isYesNo = false;
        delete propositions;
        delete voters;
        questionState = WorkflowStatus.QuestionDescription;

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
    function nextState() public {
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
    function getState() public view returns(WorkflowStatus){
        return questionState;
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
    //function getWinner() public view returns () {
    //    require(questionState == VotesTallied, "les votes ne sont pas terminés");
    //    return
    //}
}