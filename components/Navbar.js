import React, { useState }  from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import {
  CB_ABI,
  RINKEBY_CB_Address,
  CB_Address,
  OP_K_CB_Address
} from '../config';

function Navbar({ ethAddress, setETHAddress, setCBContract, setUserSigner }) {
  const [chainName, setChainName] = useState('');

  const openWithMetaMask = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);  
    console.log(provider);
    const { chainId } = await provider.getNetwork();

    const signer = provider.getSigner();
    setUserSigner(signer);
    const address = await signer.getAddress();
    setETHAddress(address);

    if(chainId === 4){
      const contract = new ethers.Contract(RINKEBY_CB_Address, CB_ABI, signer);
      setCBContract(contract);
      setChainName("Rinkeby")
    }
    else if(chainId === 69){
      const contract = new ethers.Contract(OP_K_CB_Address, CB_ABI, signer);
      setCBContract(contract);
      setChainName("Optimistic Kovan")
    }
    else if(chainId === 31949730){
      const contract = new ethers.Contract(CB_Address, CB_ABI, signer);
      setCBContract(contract);
      setChainName("Skale")
    }
    else{
      alert("No contract for this network");
    }

  }

  return (
    <nav className="relative container mx-auto p-3">
      <div className="flex items-center justify-between">
        <div className="pt-2">
          <Link className="navbar-brand" href="/">
            <img className="h-12 cursor-pointer" src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="flex space-x-5">
          <Link href="/">Home</Link>
          <Link href="/signup">Signup</Link>
          <Link href="/map">Map</Link>
        </div>
        <div className="flex">
        {chainName &&  <span className="py-2 px-4 font-semibold italic mr-2">{chainName}</span>}
          <button className="py-2 px-4 text-white bg-blue-600 rounded-full baseline hover:bg-blue-400" onClick={openWithMetaMask}>
            {ethAddress ? ethAddress.substring(0,8) + "..." + ethAddress.substring(34,42) : "Connect to Wallet"}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar