const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
    let VotingContract;
    let votingContract;

    beforeEach(async function () {
        VotingContract = await ethers.getContractFactory("voting");
        votingContract = await VotingContract.deploy();
        await votingContract.deployed();
    });

    it("Should deploy the contract and set the owner", async function () {
        const ownerAddress = await votingContract.owner();
        expect(ownerAddress).to.equal("0x235A4916AD08Cd69Daa839dDBc98322930Fc12Ab");
    });

    it("Should allow the owner to write a question", async function () {
        await votingContract.writeQuestion("What is your question?");
        const question = await votingContract.question();
        expect(question.description).to.equal("What is your question?");
    });

    it("Should allow adding proposals", async function () {
        await votingContract.writeQuestion("What is your question?");
        await votingContract.addProposal("Proposal 1");
        await votingContract.addProposal("Proposal 2");

        const proposals = await votingContract.propositions(1);
        expect(proposals.description).to.equal("Proposal 2");
    });

    it("Should allow whitelisted and not blacklisted users to vote", async function () {
        await votingContract.writeQuestion("What is your question?");
        await votingContract.addProposal("Proposal 1");

        await votingContract.addInWhitelist("0xB17D4FF999a3184D9445003a0fA99db51B31F702");

        await expect(votingContract.connect(ethers.provider.getSigner(1)).vote(0)).to.not.be.reverted;
    });

    it("Should not allow blacklisted users to vote", async function () {
        await votingContract.writeQuestion("What is your question?");
        await votingContract.addProposal("Proposal 1");

        await votingContract.addInBlacklist("0xB17D4FF999a3184D9445003a0fA99db51B31F702");

        await expect(votingContract.connect(ethers.provider.getSigner(1)).vote(0)).to.be.revertedWith("vous n'etes pas autorise a voter");
    });

    it("Should not allow a user to vote twice", async function () {
        await votingContract.writeQuestion("What is your question?");
        await votingContract.addProposal("Proposal 1");

        await votingContract.addInWhitelist(await ethers.provider.getSigner(1).getAddress());

        await votingContract.connect(ethers.provider.getSigner(1)).vote(0);
        await expect(votingContract.connect(ethers.provider.getSigner(1)).vote(0)).to.be.revertedWith("Vous avez deja vote.");
    });
});