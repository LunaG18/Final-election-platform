import React from 'react';


import { Candidate } from '@/models/candidate';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import ManifestoModel from './modals/Manifesto';


interface CandidateProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (id: string) => void;
    candidate: Candidate;
}

const Candidate = ({ id, label, checked, onChange, candidate }: CandidateProps) => {

    const [showModal, setShowModal] = useState(false);


    return (
        <div className="border shadow-lg rounded-lg p-4 w-[30rem] flex items-center justify-between bg-blue-400">
            <div className='flex flex-col justify-start w-60'>
                <section>
                    <Avatar className='rounded-full w-40 h-60'>
                        <AvatarImage src={candidate.profileImage} alt="candidate image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-lg font-semibold">{candidate.firstName} {candidate.lastName}</span>
                </section>

            </div>
            <section className='flex flex-col gap-4 items-center'>
                <section
                className='flex flex-col gap-2'
                >
                    <Avatar className='rounded-full w-20 h-20'>
                        <AvatarImage src={candidate.partyLogo} alt="party logo" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-bold text-center">{candidate.party}</span>
                </section>
                <section className='flex flex-row gap-2'><p className='font-semibold text-[1rem]'>Party ID:</p><span className="font-bold text-center underline">{candidate.id}</span></section>
                <ManifestoModel
                    candidate={candidate}
                />
                <br></br>
                <section
                className='flex flex-row gap-2'
                >
                    <p className='font-semibold text-[1rem]'>Vote:</p>
                    <div className="">
                        <input
                            type="checkbox"
                            id={id}
                            checked={checked}
                            onChange={() => onChange(id)}
                            className="w-6 h-6 rounded-full border-2 border-gray-400 focus:outline-none focus:border-blue-500 cursor-pointer"
                        />
                    </div>
                </section>
            </section>
        </div>
    );
};

export default Candidate;
