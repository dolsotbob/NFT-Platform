import { ethers } from 'hardhat';
import { makeAbi } from './abiGenerator';

async function main() {
    const contractName = "MintNFT";
    const name = 'Spring';
    const symbol = "SPR";

    if (!name || !symbol) {
        throw new Error('Todo: (scripts/deploy.ts) name or symbol is empty');
    }

    console.log('Deploying contracts');

    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy(name, symbol);

    await contract.waitForDeployment();

    console.log(`Contract deployed at: ${contract.target}`);
    await makeAbi(`${contractName}`, contract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});