// app/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import ImageUpload from "../components/ImageUpload";

export default function HomePage() {
  const [assessmentResult, setAssessmentResult] = useState<number | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any | null>(null);

  // Handle image upload and send to Flask API
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/assess",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAssessmentResult(response.data.damage_assessment);
    } catch (error) {
      console.error("Error assessing damage:", error);
    }
  };

  // Initialize Web3 and contract
  const initWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Add your contract's ABI and address here
      const contractABI: AbiItem[] = []; // Replace with your actual ABI
      const contractAddress = ""; // Your contract address here
      const contractInstance = new web3Instance.eth.Contract(
        contractABI,
        contractAddress
      );
      setContract(contractInstance);
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Approve claim based on assessment result
  const handleApproveClaim = async () => {
    if (web3 && contract) {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .approveClaim(accounts[0])
        .send({ from: accounts[0] });
      alert("Claim Approved!");
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        AI-Powered Damage Assessment
      </h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      {assessmentResult !== null && (
        <div className="mt-8">
          <p className="text-lg">
            Damage Assessment Result:{" "}
            <span className="font-semibold">{assessmentResult}</span>
          </p>
          {assessmentResult > 0.5 && (
            <button
              onClick={handleApproveClaim}
              className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Approve Claim
            </button>
          )}
        </div>
      )}
    </div>
  );
}
