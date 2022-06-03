import { useState, useEffect } from "react";

import { useEthers } from "../contexts/EthersProviderContext";
import styles from './WalletButton.module.scss';

export const WalletButton = () => {
  const { address, isUpdating, connectProvider, signer, provider, disconnect } =
    useEthers();
  const [shortAddress, setShortAddress] = useState();

  useEffect(() => {
    if (address) {
      let addyString = address.toString();
      let first4 = addyString.slice(0, 4);
      let last4 = addyString.slice(addyString.length - 4, addyString.length);
      setShortAddress(`${first4}...${last4}`);
    }
  }, [address]);

  return (
    <>
      {provider ? (
        <>
          {shortAddress && <p className={styles.shortAddress}>{shortAddress}</p>}
          <button className={styles.button} onClick={() => disconnect()}>Disconnect</button>
        </>
      ) : (
        <>
          <button
            className={styles.button}
            onClick={() => connectProvider()}
          >
            Connect Wallet
          </button>
        </>
      )}
    </>
  );
};
