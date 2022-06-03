const {MerkleTree} = require("merkletreejs");
const keccak256 = require("keccak256");
import {premintPublicList, boardedList, doubleList} from '../../utils/allowlist';

const premintNodes = premintPublicList.map((addy) => keccak256(addy));
const boardedNodes = boardedList.map((addy) => keccak256(addy));
const doubleNodes = doubleList.map((addy) => keccak256(addy));
const premintTree = new MerkleTree(premintNodes, keccak256, {sortPairs: true});
const boardedTree = new MerkleTree(boardedNodes, keccak256, {sortPairs: true});
const doubleTree = new MerkleTree(doubleNodes, keccak256, {sortPairs: true});

export default function handler(req, res) {
    try {
    const body = JSON.parse(req.body);
    const addressToCheck = body.address;
    const premintleaf = keccak256(addressToCheck);
    const premintroot = premintTree.getRoot().toString("hex");
    const premintproof = premintTree.getProof(premintleaf);
    const premintHexProof = premintTree.getHexProof(premintleaf);
    const isPremint = premintTree.verify(premintproof, premintleaf, premintroot);
    const boardedleaf = keccak256(addressToCheck);
    const boardedroot = boardedTree.getRoot().toString("hex");
    const boardedproof = boardedTree.getProof(boardedleaf);
    const boardedHexProof = boardedTree.getHexProof(boardedleaf);
    const isBoarded = boardedTree.verify(boardedproof, boardedleaf, boardedroot);
    const doubleleaf = keccak256(addressToCheck);
    const doubleroot = doubleTree.getRoot().toString("hex");
    const doubleproof = doubleTree.getProof(doubleleaf);
    const doubleHexProof = doubleTree.getHexProof(doubleleaf);
    const isDouble = doubleTree.verify(doubleproof, doubleleaf, doubleroot);
    const proofs = {premintHexProof, boardedHexProof, doubleHexProof};
    const booleans = {isPremint, isBoarded, isDouble};
    res.status(200).json({proofs, booleans});
    }
    catch (error) {
        res.status(500).json({error});
    }
}