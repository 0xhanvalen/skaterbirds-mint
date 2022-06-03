export const SkaterBirdsABI = [
  { type: "constructor", stateMutability: "nonpayable", inputs: [] },
  { type: "error", name: "ApprovalCallerNotOwnerNorApproved", inputs: [] },
  { type: "error", name: "ApprovalQueryForNonexistentToken", inputs: [] },
  { type: "error", name: "ApprovalToCurrentOwner", inputs: [] },
  { type: "error", name: "ApproveToCaller", inputs: [] },
  { type: "error", name: "BalanceQueryForZeroAddress", inputs: [] },
  { type: "error", name: "MintToZeroAddress", inputs: [] },
  { type: "error", name: "MintZeroQuantity", inputs: [] },
  { type: "error", name: "OwnerQueryForNonexistentToken", inputs: [] },
  { type: "error", name: "TransferCallerNotOwnerNorApproved", inputs: [] },
  { type: "error", name: "TransferFromIncorrectOwner", inputs: [] },
  { type: "error", name: "TransferToNonERC721ReceiverImplementer", inputs: [] },
  { type: "error", name: "TransferToZeroAddress", inputs: [] },
  { type: "error", name: "URIQueryForNonexistentToken", inputs: [] },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "approved",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "tokenId",
        internalType: "uint256",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "operator",
        internalType: "address",
        indexed: true,
      },
      { type: "bool", name: "approved", internalType: "bool", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { type: "address", name: "from", internalType: "address", indexed: true },
      { type: "address", name: "to", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "tokenId",
        internalType: "uint256",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "approve",
    inputs: [
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "balanceOf",
    inputs: [{ type: "address", name: "owner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "boardedOrDoubleMint",
    inputs: [
      { type: "uint8", name: "_quantity", internalType: "uint8" },
      { type: "bytes32[]", name: "_merkleProof", internalType: "bytes32[]" },
      { type: "bool", name: "boardedMint", internalType: "bool" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "getApproved",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isApprovedForAll",
    inputs: [
      { type: "address", name: "owner", internalType: "address" },
      { type: "address", name: "operator", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "name",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "ownerOf",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "preMint",
    inputs: [
      { type: "uint8", name: "_quantity", internalType: "uint8" },
      { type: "bytes32[]", name: "_merkleProof", internalType: "bytes32[]" },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "publicMint",
    inputs: [{ type: "uint8", name: "quantity", internalType: "uint8" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "address", name: "", internalType: "address" },
      { type: "uint256", name: "", internalType: "uint256" },
    ],
    name: "royaltyInfo",
    inputs: [
      { type: "uint256", name: "_tokenId", internalType: "uint256" },
      { type: "uint256", name: "_salePrice", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "safeTransferFrom",
    inputs: [
      { type: "address", name: "from", internalType: "address" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "safeTransferFrom",
    inputs: [
      { type: "address", name: "from", internalType: "address" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
      { type: "bytes", name: "_data", internalType: "bytes" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setAllowList",
    inputs: [
      { type: "bytes32", name: "_root", internalType: "bytes32" },
      { type: "uint8", name: "list", internalType: "uint8" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setApprovalForAll",
    inputs: [
      { type: "address", name: "operator", internalType: "address" },
      { type: "bool", name: "approved", internalType: "bool" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setBaseURI",
    inputs: [{ type: "string", name: "_newURI", internalType: "string" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setPhase",
    inputs: [{ type: "uint8", name: "_newPhase", internalType: "uint8" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setReveal",
    inputs: [{ type: "bool", name: "_newVal", internalType: "bool" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setUnrevealedURI",
    inputs: [{ type: "string", name: "_newURI", internalType: "string" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "bool", name: "isRevealed", internalType: "bool" },
      { type: "uint8", name: "mintPhase", internalType: "uint8" },
      { type: "uint16", name: "presaleSupply", internalType: "uint16" },
      { type: "string", name: "baseURI", internalType: "string" },
      { type: "string", name: "unrevealedURI", internalType: "string" },
      { type: "bytes32", name: "boardedList", internalType: "bytes32" },
      { type: "bytes32", name: "doubleList", internalType: "bytes32" },
      { type: "bytes32", name: "premintList", internalType: "bytes32" },
      { type: "uint256", name: "publicMintPrice", internalType: "uint256" },
      { type: "uint256", name: "presaleMintPrice", internalType: "uint256" },
      { type: "uint256", name: "amountHeld", internalType: "uint256" },
      { type: "address", name: "owner", internalType: "address" },
    ],
    name: "slot0",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "bool", name: "hasTeamMinted", internalType: "bool" },
      { type: "uint16", name: "totalSupply", internalType: "uint16" },
      { type: "uint16", name: "totalMinted", internalType: "uint16" },
    ],
    name: "slot1",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "supportsInterface",
    inputs: [{ type: "bytes4", name: "interfaceId", internalType: "bytes4" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "symbol",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "teamMint",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "tokenURI",
    inputs: [{ type: "uint256", name: "_tokenID", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalSupply",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferFrom",
    inputs: [
      { type: "address", name: "from", internalType: "address" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "_newOwner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "updateRoyalty",
    inputs: [
      { type: "address", name: "_newRecipient", internalType: "address" },
      { type: "uint96", name: "_newFee", internalType: "uint96" },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "withdraw",
    inputs: [],
  },
];
