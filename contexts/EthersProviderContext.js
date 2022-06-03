import { useState, useEffect, useContext, createContext, useRef } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { supportedChains } from "../utils/chain.js";
import {
  deriveChainId,
  deriveSelectedAddress,
  getProviderOptions,
} from "../utils/web3modal.js";

export const EthersContext = createContext(null);

export const EthersContextFC = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);



  const disconnect = async () => {
    const providerOptions = getProviderOptions();

    const web3modal = new Web3Modal({
      providerOptions,
    });
    web3modal.clearCachedProvider();
    setProvider(null);
    setSigner(null);
    setAddress(null);
  };

  const connectProvider = async () => {
    const providerOptions = getProviderOptions();

    const web3modal = new Web3Modal({
      providerOptions,
    });
    setIsUpdating(true);
    const instance = await web3modal.connect();
    const tempProvider = new ethers.providers.Web3Provider(instance);
    const tempSigner = tempProvider.getSigner();
    const tempAddress = await tempSigner.getAddress();
    setProvider(tempProvider);
    setSigner(tempSigner);
    setAddress(tempAddress);
  };

  return (
    <EthersContext.Provider
      value={{
        connectProvider,
        disconnect,
        isUpdating,
        provider,
        signer,
        address,
      }}
    >
      {children}
    </EthersContext.Provider>
  );
};

export const useEthers = () => {
  const { isUpdating, disconnect, provider, signer, address, connectProvider } =
    useContext(EthersContext);
  return { isUpdating, disconnect, provider, signer, address, connectProvider };
};
