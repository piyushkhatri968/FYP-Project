import React from 'react'
import Category from './Category';
import Featured from './Featured';
import Hero from './Hero';
import InterstedJobs from './InterstedJobs';
import TopCompanies from './TopCompanies';

function HomePage() {
    return ( 
        <>
        <Hero/>
        <Category/>
        <InterstedJobs/>
        <TopCompanies/>
        <Featured/>

        
        </>
     );
}

export default HomePage;