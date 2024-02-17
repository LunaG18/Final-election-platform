
"use client";
// Import necessary modules
import Image from 'next/image'
import CandidateItem from '@/components/CandidateItem'
import { useState } from 'react';
import { Candidate } from '@/models/candidate';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Confirmation from '@/components/modals/Confirmation';



// Define the Home component
export default function Home() {
  // Initialize state to manage the checked candidate ID
  const [checkedId, setCheckedId] = useState("");

  // Function to handle checkbox change
  const handleChange = (id: string) => {
    setCheckedId(id);
  };

  // Define candidate data
  const candidates: Candidate[] = [{

    id: '1',
    profileImage: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Prime_Minister_Sunak_met_with_President_Ramaphosa_of_South_Africa_in_Number_10_-_2022_%28cropped%29.jpg',
    firstName: 'Cyril',
    lastName: 'Ramaphosa',
    party: 'ANC',
    partyLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0d/African_National_Congress_logo.svg',
    manifesto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget turpis vel odio porta posuere.'
  },
  {
    id: '2',
    profileImage: 'profile2.jpg',
    firstName: 'Jane',
    lastName: 'Smith',
    party: 'Democratic Party',
    partyLogo: 'party2.jpg',
    manifesto: 'Nulla nec orci non augue fermentum viverra. Phasellus tempus, tortor et bibendum tempor.'
  },
  {
    id: '3',
    profileImage: 'profile3.jpg',
    firstName: 'Michael',
    lastName: 'Johnson',
    party: 'Republican Party',
    partyLogo: 'party3.jpg',
    manifesto: 'Vestibulum id tincidunt metus. Vivamus in dui vel lectus eleifend viverra.'
  } ,
  {
    id: '4',
    profileImage: 'profile3.jpg',
    firstName: 'Michael',
    lastName: 'Johnson',
    party: 'Republican Party',
    partyLogo: 'party3.jpg',
    manifesto: 'Vestibulum id tincidunt metus. Vivamus in dui vel lectus eleifend viverra.'
  } ,
  {
    id: '5',
    profileImage: 'profile3.jpg',
    firstName: 'Michael',
    lastName: 'Johnson',
    party: 'Republican Party',
    partyLogo: 'party3.jpg',
    manifesto: 'Vestibulum id tincidunt metus. Vivamus in dui vel lectus eleifend viverra.'
  } ,
  {
    id: '6',
    profileImage: 'profile3.jpg',
    firstName: 'Michael',
    lastName: 'Johnson',
    party: 'Republican Party',
    partyLogo: 'party3.jpg',
    manifesto: 'Vestibulum id tincidunt metus. Vivamus in dui vel lectus eleifend viverra.'
  }
  ];

  const selectedCandidate = candidates.find(candidate => candidate.id === checkedId);

  // Return JSX for rendering
  return (
    <div className="flex flex-col items-center gap-4 bg-blue-300">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Voting Page</h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Vote For Your Candidate
        </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
        {/* Map over candidates and render Candidate components */}
        {candidates.map((candidate) => (
          <CandidateItem
            key={candidate.id}
            id={candidate.id}
            label={candidate.firstName}
            checked={checkedId === candidate.id}
            onChange={handleChange}
            candidate={candidate}
          />
        ))}
      </div>

      {selectedCandidate && (
        <Confirmation candidate={selectedCandidate} />
      )}

    </div>
  )
}
