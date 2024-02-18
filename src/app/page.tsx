"use client";
 
import React, { use } from 'react'
 
import { useState, useEffect } from "react";
 
import database from "@/util/database";
import { Vote } from "@/models/vote";

 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
 
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
 
const Graphs = () => {
 
  const [votes, setVotes] = useState<Vote[]>([]);
 
  useEffect(() => {
    fetchVotes();
  }, []);
 
  async function fetchVotes() {
    const votes = await database.getVotes();
    setVotes(votes);
  }
 
  const getTotalVotes = () => {
    return votes.length;
  }
 
  const getVotesByParty = () => {
    const partyIds: { [key: string]: number } = {}; // Add index signature to allow indexing with a string
    for (const { party_id } of votes) { // Access 'votes' state variable
      partyIds[party_id] = (partyIds[party_id] || 0) + 1;
    }
    return partyIds; // Return the calculated result
  }
 
 
 
 
 
 
  const getPercentageOfVotesByParty = () => {
    const totalVotes = getTotalVotes();
    const votesByParty = getVotesByParty();
    const percentageByParty: { [key: string]: number } = {};
 
    for (const partyId in votesByParty) {
      percentageByParty[partyId] = (votesByParty[partyId] / totalVotes) *  100;
    }
 
    return percentageByParty;
  }
 
 
 
 
 
 
 
 
  const getVotesByProvince = () => {
    const provinceIds: { [key: string]: number } = {}; // Add index signature to allow indexing with a string
    for (const { voter } of votes) { // Access 'votes' state variable
      provinceIds[voter.province] = (provinceIds[voter.province] || 0) + 1;
    }
    return provinceIds; // Return the calculated result
  }
 
  const getVotesByPartyAndProvince = () => {
    const partyAndProvinceIds: { [key: string]: { [key: string]: number } } = {}; // Add index signature to allow indexing with a string
    for (const { party_id, voter } of votes) { // Access 'votes' state variable
      partyAndProvinceIds[party_id] = partyAndProvinceIds[party_id] || {};
      partyAndProvinceIds[party_id][voter.province] = (partyAndProvinceIds[party_id][voter.province] || 0) + 1;
    }
    return partyAndProvinceIds; // Return the calculated result
  }
 
  const getBarChartDataAndOptionsForStacked = () => {
    const parties = Object.keys(getVotesByPartyAndProvince());
    const provinces = new Set(); // Using a set to collect unique provinces
    parties.forEach((partyId) => {
      Object.keys(getVotesByPartyAndProvince()[partyId]).forEach((province) => {
        provinces.add(province); // Add province to set
      });
    });
    const uniqueProvinces = Array.from(provinces); // Convert set to array
    const colors = [
        'rgba(255,  255,  0,  0.8)', // Yellow
        'rgba(0,  0,  255,  0.8)',   // Blue
        'rgba(255,  0,  0,  0.8)',   // Red
        'rgba(255,  255,  102,  0.8)', // Mustard
        'rgba(0,  128,  0,  0.8)',   // Green
        'rgba(255,  165,  0,  0.8)',
    ]; 
 
    const colorMap = {}; // Map to store colors for each province
    uniqueProvinces.forEach((province, index) => {
      colorMap[province] = colors[index % colors.length]; // Assign color to province
    });
 
    const data = {
      labels: parties,
      datasets: uniqueProvinces.map((province) => ({
        label: province,
        data: parties.map((partyId) => getVotesByPartyAndProvince()[partyId][province] || 0), // Fill in 0 for parties with no presence in the province
        backgroundColor: parties.map((partyId) => colorMap[province]), // Use color from color map
        borderColor: 'rgba(0, 0, 0, 1)', // Border color for bars
        borderWidth: 1,
      })),
    };
 
    const options = {
       
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const totalVotes = getTotalVotes();
            const dataIndex = context.dataIndex;
            const value = context.dataset.data[dataIndex];
            const percentage = ((value / totalVotes) *  100).toFixed(2);
            return `${context.dataset.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };
 
  return { data, options };
  };
 
 
  const getBarChartDataAndOptions = () => {
    const data = {
      labels: Object.keys(getVotesByParty()),
      datasets: [
        {
          label: 'Votes by Party',
          data: Object.values(getVotesByParty()),
          backgroundColor: [
            'rgba(255,  255,  0,  0.8)', // Yellow
            'rgba(0,  0,  255,  0.8)',   // Blue
            'rgba(255,  0,  0,  0.8)',   // Red
            'rgba(255,  255,  102,  0.8)', // Mustard
            'rgba(0,  128,  0,  0.8)',   // Green
            'rgba(255,  165,  0,  0.8)'  // Orange
          ],
          borderColor: [
            'rgba(255,  255,  0,  1)', // Yellow
            'rgba(0,  0,  255,  1)',   // Blue
            'rgba(255,  0,  0,  1)',   // Red
            'rgba(255,  255,  102,  1)', // Mustard
            'rgba(0,  128,  0,  1)',   // Green
            'rgba(255,  165,  0,  1)'  // Orange
          ],
          borderWidth:  1,
        },
      ],
    };
 
    const options = {
       
      scales: {
        y: {
          beginAtZero: true
        }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const totalVotes = getTotalVotes();
            const dataIndex = context.dataIndex;
            const value = context.dataset.data[dataIndex];
            const percentage = ((value / totalVotes) *  100).toFixed(2);
            return `${context.dataset.label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };
 
  return { data, options };
  }
 
  
  return (
    <div className="flex flex-col items-center gap-4 bg-blue-300">
     <div className="flex flex-col items-center justify-center space-y-4 text-center">
     <img
             src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/election-campaign-logo-template-design-d097bf8c17d33549b3f4e7c6ed1c9de0_screen.jpg?ts=1677474006"
             alt="Election logo"
             className="mx-auto h-auto w-[15rem]"/>
            <h2 className="text-3xl font-bold"> National Elections</h2>
        <h1 className="text-2xl font-bold">Live poll results</h1>
        <p className="max-w-3xl text-black dark:text-gray-400 border p-4">
          Welcome to the live polling results of our voting app, where real-time democracy unfolds at your fingertips! As the votes pour in, we're here to provide you with real-time updates on how your favourite candidates are performing. Whether you're a first-time visitor or a returning user, we encourage you to register or log in to take part in this pivotal process. Casting your vote for your favourite candidate not only amplifies your voice but also shapes the future direction of governance. Don't miss this chance to make your vote count in real-time, as we bring the power of decision-making closer to you than ever before.
        </p>
        <div className="my-4 border-b border-gray-200 dark:border-gray-800" />
      </div>
        <div className='flex flex-row'>
      <div className="w-1/2 mr-4">
      <section className='flex flex-row gap-10'>
        <section className='border shadow-lg rounded-lg p-4 w-[20rem] flex flex-col gap-1  justify-between bg-blue-400'>
        <h2 className="text-lg font-semibold"><u>Results</u></h2>
        <p className="font-semibold italic">Total votes: {getTotalVotes()}</p>
        <h2 className="font-semibold text-m">Votes by Party</h2>
        {
        Object.entries(getVotesByParty()).map(([partyId, votes]) => (
          <p key={partyId}>Party {partyId}: {votes}</p>
        ))
      }
      </section>
      <p><br></br></p>
      <section className='border shadow-lg rounded-lg p-4 w-[20rem] flex flex-col gap-1  justify-between bg-blue-400'>
      <h2 className="text-lg font-semibold"><u>Votes by Province</u></h2>
      {
        Object.entries(getVotesByProvince()).map(([province, votes]) => (
          <p key={province}>{province}: {votes}</p>
        ))
      }
      </section>
     </section>
      <p><br></br></p>
     <section className='flex flex-row gap-10'>
        <section className='border shadow-lg rounded-lg p-4 w-[20rem] h-[20rem] flex flex-col gap-1  justify-between bg-blue-400'>
<h2 className="text-lg font-semibold"><u>Votes by Party (Percentage)</u></h2>
    {
      Object.entries(getPercentageOfVotesByParty()).map(([partyId, percentage]) => (
        <p key={partyId}>Party {partyId}: {percentage.toFixed(2)}%</p>
      ))
    }
    </section>
    <p><br></br></p>
      <section className='border shadow-lg rounded-lg p-4 w-[20rem] flex flex-col gap-1  justify-between bg-blue-400'>
     <h2 className="text-lg font-semibold"><u>Votes by Party and Province</u></h2>
      {
        Object.entries(getVotesByPartyAndProvince()).map(([partyId, votesByProvince]) => (
          <div key={partyId}>
            <h3 className="font-semibold text-m">Party {partyId}:</h3>
            {
              Object.entries(votesByProvince).map(([province, votes]) => (
                <p key={province}>{province}: {votes}</p>
              ))
            }
          </div>
        ))
      }
       </section>
     </section>
      </div>
      <div className="w-1/2">
        <h2 className='text-center text-[2rem] font-semibold text-white'>Votes by Party</h2>
        <Bar data={getBarChartDataAndOptions().data} options={getBarChartDataAndOptions().options} />
        
        <section className='flex flex-row'> 
            <img
        src="https://upload.wikimedia.org/wikipedia/en/0/0d/African_National_Congress_logo.svg"
        alt="ANC"
        className="rounded-full w-20 h-20"/>
        <img
        src="https://liberal-international.org/wp-content/uploads/2017/05/DA-240x240.jpg"
        alt="DA"
        className="rounded-full w-20 h-20"/>
        <img
        src="https://www.politicsweb.co.za/politicsweb/media_stream/politicsweb/1/394442/images/EffLogo2.png"
        alt="EFF"
        className="rounded-full w-20 h-20"/>
        <img
        src="https://upload.wikimedia.org/wikipedia/en/6/6e/Inkatha_Freedom_Party_logo.svg"
        alt="IFP"
        className="rounded-full w-20 h-20"/>
        <img
        src="https://upload.wikimedia.org/wikipedia/en/7/72/Freedom_Front_Plus.svg"
        alt="VF+"
        className="rounded-full w-20 h-20"/>
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/8d/GOOD_%28political_party%29.svg"
        alt="GOOD"
        className="rounded-full w-20 h-20"/>
        </section>
      </div>
      </div>
    </div>
  );
}
 
export default Graphs
