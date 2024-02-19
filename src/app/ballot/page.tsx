"use client";
// Import necessary modules
import Image from 'next/image'
import CandidateItem from '@/components/CandidateItem'
import { useState } from 'react';
import { Candidate } from '@/models/candidate';
import { useEffect } from 'react';

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
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter } from 'next/navigation';
import useAuthentication from '@/hooks/useAuthentication';
import database from '@/util/database';
import { Vote } from '@/models/vote';
import { UUID } from 'crypto';
import { auth } from '@/util/firebase';
import { Voter } from '@/models/voter';
import { HOME_ROUTE } from '@/constants/routes';




// Define the Home component
export default function Home() {
  // Initialize state to manage the checked candidate ID
  const [checkedId, setCheckedId] = useState("");
  const [voter, setVoter] = useState<any>();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState('');
  const router = useRouter();


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
       
        const userID = user.uid;
``
        const promisedVoter: Promise<Voter | undefined> = database.getVoter(userID);
 
        const allVotes = database.getVotes();
 
        allVotes.then((votes) => {
          votes.forEach((vote) => {
            if (vote.voter.user_id === userID) {             
              alert("You've already voted!")
              router.push("/");
            }            
          });
        }); 
 
        promisedVoter.then((voter) => {
          if (voter) {
            setVoter(voter);
          }
        });
 
       
      }
    });
  }
  , []);

  /*useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        
        const userID = user.uid;
``
        const promisedVoter: Promise<Voter | undefined> = database.getVoter(userID);

        promisedVoter.then((voter) => {
          if (voter) {
            setVoter(voter);
          }
        });

       
      }
    });
  }
  , []);
*/

  // Function to handle checkbox change
  const handleChange = (id: string) => {
    setCheckedId(id);
  };
  // Define candidate data
  const candidates: Candidate[] = [{
    id: '0',
    profileImage: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Prime_Minister_Sunak_met_with_President_Ramaphosa_of_South_Africa_in_Number_10_-_2022_%28cropped%29.jpg',
    firstName: 'Cyril',
    lastName: 'Ramaphosa',
    party: 'ANC',
    partyLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0d/African_National_Congress_logo.svg',
    manifesto: 'The African National Congress (ANC) is a political party in South Africa. It originated as a liberation movement known for its opposition to apartheid and has governed the country since 1994, when the first post-apartheid election resulted in Nelson Mandela being elected as President of South Africa. Cyril Ramaphosa, the incumbent national President, has served as President of the ANC since 18 December 2017.'
  },
  {
    id: '1',
    profileImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/John_Steenhuisen_%28cropped%29.jpg',
    firstName: 'John',
    lastName: 'Steenhuisen',
    party: 'DA',
    partyLogo: 'https://liberal-international.org/wp-content/uploads/2017/05/DA-240x240.jpg',
    manifesto: 'The Democratic Alliance (DA; Afrikaans: Demokratiese Alliansie) is a South African political party and the official opposition to the ruling African National Congress (ANC). The party is broadly centrist, and has been attributed both centre-left and centre-right policies. It is a member of Liberal International and the Africa Liberal Network. The DA traces its roots to the founding of the anti-apartheid Progressive Party in 1959, with many mergers and name changes between that time and the present. The DA ideologically shows a variety of liberal tendencies, including social liberalism, classical liberalism, and conservative liberalism. The current leader of the party is John Steenhuisen, who was announced as the new leader on 1 November 2020 after the partys Federal Congress.'
  },
  {
    id: '2',
    profileImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Julius_Malema_2011-09-14_%28cropped2%29.jpg',
    firstName: 'Julius',
    lastName: 'Malema',
    party: 'EFF',
    partyLogo: 'https://www.politicsweb.co.za/politicsweb/media_stream/politicsweb/1/394442/images/EffLogo2.png',
    manifesto: 'The Economic Freedom Fighters (EFF) is a South African Marxist–Leninist and black nationalist political party. It was founded by expelled former African National Congress Youth League (ANCYL) President Julius Malema, and his allies, in 2013. Malema is President of the EFF, heading the Central Command Team which serves as the central structure of the party. It is currently the third-largest party in both houses of the South African Parliament. The party is also the official opposition in three of South Africas nine provincial legislatures.'
  } ,
  {
    id: '3',
    profileImage: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Hon-velenkosini-hlabisa.jpg',
    firstName: 'Velenkosini',
    lastName: 'Hlabisa',
    party: 'IFP',
    partyLogo: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Inkatha_Freedom_Party_logo.svg',
    manifesto: 'The Inkatha Freedom Party (IFP; Zulu: IQembu leNkatha yeNkululeko) is a right-wing political party in South Africa. Although registered as a national party, it has had only minor electoral success outside its home province of KwaZulu-Natal. Mangosuthu Buthelezi, who served as chief minister of KwaZulu during the Apartheid period, founded the party in 1975 and led it until 2019. He was succeeded as party president in 2019 by Velenkosini Hlabisa.'
  } ,

    {
    id: '4',
    profileImage: 'https://upload.wikimedia.org/wikipedia/commons/3/35/PJ_Groenewald_%28cropped%29.jpg',
    firstName: 'Pieter',
    lastName: 'Groenewald',
    party: 'VF+',
    partyLogo: 'https://upload.wikimedia.org/wikipedia/en/7/72/Freedom_Front_Plus.svg',
    manifesto: 'The Freedom Front Plus (FF Plus; Afrikaans: Vryheidsfront Plus, VF Plus) is a right-wing political party in South Africa that was formed (as the Freedom Front) in 1994. It is led by Pieter Groenewald. The Freedom Front was founded on 1 March 1994 by members of the Afrikaner community under Constand Viljoen, after he had left the Afrikaner Volksfront amidst disagreements. Seeking to achieve his goals through electoral means, Viljoen registered the Freedom Front with the Independent Electoral Commission (IEC) on 4 March 1994 to take part in the April 1994 general elections (This date has also been given as 7 March). On 12 March 1994 Viljoen handed in a list of candidates for the FF to the IEC, confirming that his party would take part in the elections.'
  } ,

  {
    id: '5',
    profileImage: 'https://www.gov.za/sites/default/files/Minister%20of%20Public%20Works%20and%20Infrastructure%20Patricia%20De%20Lille%20NGI_8397.jpg',
    firstName: 'Patricia',
    lastName: 'de Lille',
    party: 'GOOD',
    partyLogo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/GOOD_%28political_party%29.svg',
    manifesto: 'Good (stylised as GOOD) is a South African political party that was formed in December 2018. It is led by its founder Patricia de Lille, current Minister of Tourism and former mayor of Cape Town. The partys policies are predominantly left-wing and its platform is premised on social democracy, environmentalism, anti-racism and Broad-Based Black Economic Empowerment. The partys stronghold is the Western Cape and mainly draws support from the Coloured community. The party holds two seats in the National Assembly of South Africa, while it also has one seat in the Western Cape Provincial Parliament. In May 2019, De Lille was the only opposition member appointed to serve in the cabinet of South Africa. She had stated that Good would remain an opposition party.'
  }
];

  const handleSubmit = async() => {
    const selectedCandidateIndex = candidates.findIndex(candidate => candidate.id === checkedId);
    const thisVoter = voter;
    const vote: Vote = {
      // party id is a string
      party_id: candidates[selectedCandidateIndex].id,
      voter: thisVoter,
      // get random 6 digit
      vote_id: `v_${Math.floor(100000 + Math.random() * 900000)}`
    }

    try {
      await database.addVote(vote);
      console.log('Vote added: ', vote);
      alert('Succesfully');
      router.push(HOME_ROUTE);
    } catch (error) {
      console.error('Error adding vote: ', error);
    }
  }

  const selectedCandidate = candidates.find(candidate => candidate.id === checkedId);


  return (
    <div className="flex flex-col items-center gap-4 bg-blue-300">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Voting Page</h1>
      <p className="mx-auto max-w-[600px] text-gray-500 text-center md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Vote for your favourite candidate by selecting their respective check box and pressing vote now.
        </p>
        {selectedCandidate && (
        <Confirmation candidate={selectedCandidate} onSubmit={handleSubmit} />
      )}
      {voter ? ( // Check if voter is found
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
      ) : (
        <p>Loading user data...</p> // Render loading message while waiting for voter to be found
      )}
  
     <p><br></br></p>
    </div>
  )
}