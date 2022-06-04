import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useState, useEffect } from "react";
import { Box, Center } from "@chakra-ui/react";
import { WalletButton } from "../components/WalletButton";
import { MintCard } from "../components/MintCard";
import { useEthers } from "../contexts/EthersProviderContext";
import { createContract } from "../utils/contract";

export default function Home() {
  const { address, isUpdating, signer, provider } = useEthers();
  const [premintStatus, setPremintStatus] = useState(false);
  const [boardedStatus, setBoardedStatus] = useState(false);
  const [doubleStatus, setDoubleStatus] = useState(false);
  const [premintProof, setPremintProof] = useState();
  const [boarderProof, setBoarderProof] = useState();
  const [doubleProof, setDoubleProof] = useState();
  const [contract, setContract] = useState();
  const [slot0, setSlot0] = useState();
  const [slot1, setSlot1] = useState();

  async function getWLStatus(address) {
    const stringedAddress = JSON.stringify({ address });
    const req = {
      method: "POST",
      body: stringedAddress,
    };
    const res = await fetch("/api/merkles", req);
    const jsonres = await res.json();
    console.log({ jsonres });
    if (jsonres?.booleans?.isPremint) {
      setPremintStatus(true);
      setPremintProof(jsonres?.proofs?.premintHexProof);
    }
    if (jsonres?.booleans?.isBoarded) {
      setBoardedStatus(true);
      setBoarderProof(jsonres?.proofs?.boardedHexProof);
    }
    if (jsonres?.booleans?.isDouble) {
      setDoubleStatus(true);
      console.log("double Proof: ", jsonres?.proofs?.doubleHexProof);
      setDoubleProof(jsonres?.proofs?.doubleHexProof);
    }
  }

  async function getContract() {
    const network = await provider?.getNetwork();
    const tempContract = createContract(network.chainId, provider, signer);
    setContract(tempContract);
  }

  useEffect(() => {
    if (address && provider && signer) {
      getWLStatus(address);
      getContract();
    }
  }, [address, provider, signer]);

  async function getSlots() {
    const tempSlot0 = await contract?.read?.slot0();
    const tempSlot1 = await contract?.read?.slot1();
    setSlot0(tempSlot0);
    setSlot1(tempSlot1);
  }

  useEffect(() => {
    getSlots();
  }, [contract]);

  return (
    <>
      <Box
      className={styles.mainContainer}
        sx={{
          backgroundImage: `/images/Mint_page_BG.png`,
          backgroundSize: `cover`,
          backgroundPosition: `bottom center`,
          width: `100vw`,
          height: `100%`,
          padding: `2rem`,
          minHeight: `100vh`
        }}
      >
        <Box
          name="nav"
          sx={{
            backgroundColor: `rgba(65, 159, 255, 1)`,
            width: `80vw`,
            margin: `0 auto`,
            color: `white`,
            padding: `.5rem 2rem`,
            borderRadius: `50px`,
            fontFamily: `'fc-marshmellow`,
          }}
        >
          <div
          className={styles.navContainer}
            style={{

            }}
          >
            <div>
              <Image
                src="/images/text_logo_4.png"
                alt="Skater Birds"
                width="97px"
                height="72px"
              />
            </div>
            <h1
              style={{
                fontFamily: `'fc-marshmallow', sans-serif`,
                fontSize: `3rem`,
                lineHeight: `1`,
                width: `fit-content`,
                margin: `0`,
                justifySelf: `center`,
              }}
            >
              Official Mint Page
            </h1>
            <div className={styles.buttonHolder}>
              <WalletButton />
            </div>
          </div>
        </Box>
        <Box name="cards" className={styles.cardGrid}>
          <MintCard
            stage="1"
            contract={contract}
            mintPhase={slot0?.mintPhase}
            boardedStatus={boardedStatus}
            doubleStatus={doubleStatus}
            boarderProof={boarderProof}
            doubleProof={doubleProof}
          >
            <h2
              style={{ fontFamily: `'Outfit', sans-serif`, fontSize: `2.5rem` }}
            >
              Presale Mint
            </h2>
            <p style={{ fontFamily: `'Outfit', sans-serif`, fontSize: `1rem` }}>
              Boarded: 1 SkaterBird for 0.088eth <br />
              Double Boarded: up to 2 Skaterbirds for 0.088eth <br />
            </p>
            <br />
          </MintCard>
          <MintCard
            stage="2"
            contract={contract}
            mintPhase={slot0?.mintPhase}
            premintStatus={premintStatus}
            premintProof={premintProof}
          >
            <h2
              style={{ fontFamily: `'Outfit', sans-serif`, fontSize: `2.5rem` }}
            >
              Raffle Mint
            </h2>
            <p style={{ fontFamily: `'Outfit', sans-serif`, fontSize: `1rem` }}>
              Presale Raffle Mint: 0.125eth!
            </p>
            <br />
          </MintCard>
          <MintCard stage="3" contract={contract} mintPhase={slot0?.mintPhase}>
            <h2
              style={{ fontFamily: `'Outfit', sans-serif`, fontSize: `2.5rem` }}
            >
              Public Mint
            </h2>
            <h3
              style={{ fontFamily: `'Outfit', sans-serif`, fontSize: `1.5rem` }}
            >
              (if required)
            </h3>
            <p style={{ fontFamily: `'Outfit', sans-serif`, fontSize: `1rem` }}>
              Public: 0.125eth!
            </p>
            <br />
          </MintCard>
        </Box>
      </Box>
      <Box name="credits" className={styles.credits}>
        <h2>
          Powered by <a href="https://www.matukilabs.io/">Matuki Labs</a>
        </h2>
        <br />
        <Image
          src="/images/matuki_labs_transparent_white.png"
          alt="Matuki Labs Launchpad"
          width="32px"
          height="32px"
        />
      </Box>
    </>
  );
}
