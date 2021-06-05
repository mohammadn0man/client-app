import React, { useEffect, useState } from 'react'
import { LoadStats } from '../actions/StatsAction'
import { FaUsers, FaReplyd } from 'react-icons/fa';
import { AiFillWechat, AiOutlineCopyrightCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const Footer = () => {
    const statsState = useSelector(state => state.statsState)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LoadStats());
    }, [])

    return (
        <div className="fixed-bottom pt-2 bg-primary">
            <div className="container ml-6 d-flex justify-content-center">
                <div className="mx-md-n5">
                    <AiFillWechat size={50} />
                    <div className="d-flex justify-content-center">
                        {statsState.isStatsLoaded ? statsState.stats.questionCount : 0}
                    </div>
                </div>
                <div className="ms-5">
                    <FaUsers size={50} />
                    <div className="d-flex justify-content-center">
                        {statsState.isStatsLoaded ? statsState.stats.userCount : 0}
                    </div>
                </div>
                <div className="ms-5">
                    <FaReplyd size={50} />
                    <div className="d-flex justify-content-center">
                        {statsState.isStatsLoaded ? statsState.stats.responseCount : 0}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                Copyright <AiOutlineCopyrightCircle />_From 2020-2021 Fresher
            </div>
        </div>
    )
}

export default Footer
