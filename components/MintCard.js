import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import styles from "./MintCard.module.scss";
import { useEthers } from "../contexts/EthersProviderContext";
import { ethers } from "ethers";

export const MintCard = (props) => {
  const { address, isUpdating, signer, provider } = useEthers();
  const [amountToMint, setAmountToMint] = useState(1);
  const [maxMint, setMaxMint] = useState(1);
  const [mintPrice, setMintPrice] = useState(0.125);
  const [bgImage, setBGImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const contract = props?.contract?.write;
  const boardedStatus = props?.boardedStatus;

  useEffect(() => {
    switch (props?.stage) {
      case "1": {
        setMaxMint(2);
        setMintPrice(0.088);
        setIsDisabled(true);
        if (props?.mintPhase >= 1 && props?.mintPhase < 3) {
          setIsDisabled(false);
        }
        setBGImage("/images/skartbirdsposterbg1.png");
        break;
      }
      case "2": {
        setMaxMint(2);
        setMintPrice(0.125);
        setIsDisabled(true);
        if (props?.mintPhase > 1 && props?.mintPhase < 3) {
          setIsDisabled(false);
        }
        setBGImage("/images/skartbirdsposterbg2.png");
        break;
      }
      case "3": {
        setMaxMint(3);
        setMintPrice(0.125);
        setIsDisabled(false);
        if (props?.mintPhase !== 3) {
          setIsDisabled(true);
        }
        setBGImage("/images/skartbirdsposterbg3.png");
        break;
      }
      default: {
        setIsDisabled(false);
        break;
      }
    }
  }, [props]);

  const incrementAmountToMint = () => {
    setAmountToMint((v) => {
      if (v + 1 > maxMint) {
        return v;
      } else {
        return v + 1;
      }
    });
  };

  const decrementAmountToMint = () => {
    setAmountToMint((v) => {
      if (v - 1 < 1) {
        return v;
      } else {
        return v - 1;
      }
    });
  };

  const publicMint = async () => {
    const price = ethers.utils.parseUnits(
      (mintPrice * amountToMint).toString(),
      "ether"
    );
    const tx = await contract.publicMint(amountToMint, { value: price });
    const receipt = await tx.wait();
    console.log(receipt);
    if (receipt?.status == 1) {
      setIsDisabled(true);
    }
  };

  const preMint = async (amount) => {
    const price = ethers.utils.parseUnits(
      (mintPrice * amount).toString(),
      "ether"
    );
    console.log(props?.proof);
    const tx = await contract.preMint(amount, props?.proof, { value: price });
    const receipt = await tx.wait();
    console.log(receipt);
    if (receipt?.status == 1) {
      setIsDisabled(true);
    }
  };

  const boarderMint = async () => {
    const price = ethers.utils.parseUnits(
      (0.088).toString(),
      "ether"
    );
    console.log(props?.proof);
    console.log(price.toString());
    console.log({contract})
    const tx = await contract.boardedOrDoubleMint(1, props?.proof, true, { value: price });
    const receipt = await tx.wait();
    console.log(receipt);
    if (receipt?.status == 1) {
      setIsDisabled(true);
    }
  }

  const doubleBoarderMint = async () => {
    const price = ethers.utils.parseUnits(
      (mintPrice * 2).toString(),
      "ether"
    );
    const tx = await contract.boardedOrDoubleMint(2, props?.proof, false, { value: price });
    const receipt = tx.wait();
    console.log(receipt);
    if (receipt?.status == 1) {
      setIsDisabled(true);
    }
  }

  return (
    <Box
      name="card"
      sx={{
        backgroundImage: isDisabled ? `none` : `${bgImage}`,
        backgroundSize: `cover`,
        backgroundColor: isDisabled ? `#ccc` : `#EFEFEF`,
        margin: `2rem auto`,
        color: isDisabled ? `#A9A9A9` : `black`,
        padding: `1rem 2rem`,
        borderRadius: `50px`,
        textAlign: `center`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `space-between`,
        width: `100%`,
      }}
    >
      {props.children}

      <br />
      {(props?.stage == 1 || props?.stage == 2) && (!isDisabled) && (
        <>
        {props?.boardedStatus == true && (
            <button className={styles.mintButton} onClick={() => boarderMint()}>
              Single MINT ({mintPrice}eth)
            </button>
          )}
          {props?.doubleStatus == true && (
            <>
            <button className={styles.mintButton} onClick={() => boarderMint()}>
              Single MINT ({mintPrice}eth)
            </button>
            <br />
            <button className={styles.mintButton} onClick={() => doubleBoarderMint()}>
              Double MINT ({2 * mintPrice}eth)
            </button>
            </>
          )}
        </>
      )}
      {(props?.stage == 2 && props?.stage !== 1) && !isDisabled && props?.premintStatus && (
        <>
          <br />
          <button className={styles.mintButton} onClick={() => preMint(1)}>
            Single MINT ({amountToMint * mintPrice}eth)
          </button>
          <br />
          <button className={styles.mintButton} onClick={() => preMint(2)}>
            Double MINT ({2 * mintPrice}eth)
          </button>
        </>
      )}
      {props?.stage == "3" && !isDisabled && (
        <>
          <div
            style={{
              display: `flex`,
              alignItems: `center`,
              margin: `0 auto`,
            }}
          >
            <button
              className={styles.decrement}
              onClick={() => decrementAmountToMint()}
            >
              -
            </button>
            <div className={styles.mintAmountDisplay}>{amountToMint}</div>
            <button
              className={styles.increment}
              onClick={() => incrementAmountToMint()}
            >
              +
            </button>
          </div>
          <br />
          <button className={styles.mintButton} onClick={() => publicMint()}>
            Public MINT ({amountToMint * mintPrice}eth)
          </button>
        </>
      )}
    </Box>
  );
};
