import Web3 from "web3";
import {GC_ADDRESS, MN_ADDRESS} from './address';
import {SkaterBirdsABI} from './abis/SkaterBirdABI';
import { chainByID } from "./chain";
import { ethers } from "ethers";

export const createContract = (chainID, provider, signer) => {
    let contractAddress;
    
    if (chainID == "0x1") {
        contractAddress = MN_ADDRESS;
    }
    
    if (chainID == "0x64") {
        contractAddress = GC_ADDRESS;
    }

    if (typeof contractAddress == "undefined") {
        alert("You must change your chain");
        return null;
    }

    const read = new ethers.Contract(contractAddress, SkaterBirdsABI, provider);
    const write = new ethers.Contract(contractAddress, SkaterBirdsABI, signer);
    return {read, write};
}