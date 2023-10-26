// deploy/1_deploy_Voting.ts
import "@nomiclabs/hardhat-ethers"
import {ethers} from "hardhat";

async function main() {

    const voting = await ethers.deployContract("Voting");

    await voting.waitForDeployment();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
console.error(error);
process.exitCode = 1;
});