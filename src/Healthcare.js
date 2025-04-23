import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../src/constants/Contract'

const Healthcare = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [isOwner, setIsOwner] = useState(null);
    const [patientID, setPatientID] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    const [patientRecords, setPatientRecords] = useState([]);


    const [providerAddress, setProviderAddress] = useState("");
    const contractAddress = CONTRACT_ADDRESS;
    const contractABI = CONTRACT_ABI;

    useEffect(() => {
        const connectWallet = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                setProvider(provider);
                setSigner(signer);

                const accountAddress = await signer.getAddress();
                setAccount(accountAddress);

                console.log(accountAddress);

                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                setContract(contract);

                const ownerAddress = await contract.getOwner();

                setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());

               

            } catch (error) {
                console.error("Error connecting to wallet: ", error);
            }

        };
        connectWallet();

    }, []);


    const fetchPatientRecords = async () => {
        try {
            const records = await contract.getPatientRecords(patientID);
            console.log(records);
            setPatientRecords(records);

        } catch(error) {
            console.error("Error fetching patient records", error);
        }
    }

    const addRecord = async () => {
        try {
            const tx = await contract.addRecord(patientID, "Alice", diagnosis, treatment);
            await tx.wait();
            fetchPatientRecords();
            await tx.wait();
            alert(`Provider ${providerAddress} authorized successfully`);

        } catch(error) {
            console.error("Error adding records", error);
        }

    }


    const authorizeProvider = async () => {
        if (isOwner){
            try {
                const tx = await contract.authorizeProvider(providerAddress);
                await tx.wait();
                alert(`Provider ${providerAddress} authorized successfully`);

            } catch(error) {
                console.error("Only contract owner can authorize different providers");
            }
        } else {
            alert("Only contract owner can call this function");
        }
    }

    return(
        <div className='container'>
            <h1 className = "title">HealthCare Application</h1>
            {account && <p className='account-info'>Connected Account: {account}</p>}
            {isOwner && <p className='owner-info'>You are the contract owner</p>}

        <div className='form-section'>
            <h2>Fetch Patient Records</h2>
            <input className='input-field' type='text' placeholder='Enter Patient ID' value={patientID} onChange={(e) => setPatientID(e.target.value)}/>
            <button className='action-button' onClick={fetchPatientRecords}>Fetch Records</button>
        </div>

        <div className="form-section">
            <h2>Add Patient Record</h2>
            <input className='input-field' type='text' placeholder='Diagnosis' value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)}/>
            <input className='input-field' type='text' placeholder='Treatment' value={treatment} onChange={(e) => setTreatment(e.target.value)}/>
            <button className='action-button' onClick={addRecord}>Add Records</button>

        </div>
        <div className="form-section">
            <h2>Authorize HealthCare Provider</h2>
            <input className='input-field' type= "text" placeholder='Provider Address' value = {providerAddress} onChange={(e) => setProviderAddress(e.target.value)}/>
            <button className='action-button' onClick={authorizeProvider}>Authorize Provider</button>
        </div>

        <div className='records-section'>
            <h2>Patient Records</h2>
            {patientRecords.map((record, index) => (
                <div key = {index}>
                    <p>Record ID: {record.recordID.toNumber()}</p>
                    <p>Diagnosis: {record.diagnosis}</p>
                    <p>Treatment: {record.treatment}</p>
                    <p>Timestamp: {new Date(record.timestamp.toNumber() * 1000).toLocaleString()}</p>
            </div>
            ))}
        </div>

        </div>

    )

}

export default Healthcare;