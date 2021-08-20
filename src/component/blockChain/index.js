import React, { useEffect, useState } from 'react';
import { firebaseApp } from '../../fbConfig';

import './style.css';
import {FaHashtag} from 'react-icons/fa';
import {IoReturnUpBack} from 'react-icons/io5'

/**
* @author
* @function BlockChain
**/


export const BlockChain = (props) => {

    const [blockChain, setBlockChain] = useState([]);


    useEffect(() => {
        const interval = setInterval(() => {

            const fetchChain = async () => {
                const db = firebaseApp.firestore();
                const snapshot = await db.collection('blockChain').get();

                if(!snapshot){
                    console.log('Block Chain DoesNot Exist');
                    return;
                }
                const chain = [];

                snapshot.forEach(doc => {
                    chain.push(doc.data());
                })

                setBlockChain(chain);
            }
            fetchChain();

        }, 5000);
        return () => clearInterval(interval);
    }, []);

    console.log(blockChain);

    return(
        <div className="blockchain-div">
            {
                blockChain.length > 0 ? 
                
                    blockChain.map(block => {
                        return(
                            <div className="blocks">
                                <label className="blockId">{block.blockNumber}</label>
                                <div className="hash-div">
                                    <label className="head1"><FaHashtag/></label>
                                    <label className="hashvalue">{block.hash}</label>
                                </div>
                                <div className="hash-div2">
                                    <label className="head2"><IoReturnUpBack/><FaHashtag/></label>
                                    <label className="hashvalue2">{block.previousHash}</label>
                                </div>
                                <div className="hash-div3">
                                    <label className="head3">Time</label>
                                    <label className="hashvalue3">{block.timing}</label>
                                </div>
                            </div>
                        );
                    })

                :

                <label >Wait a Moment..</label>
            }

        </div>
    )

 }