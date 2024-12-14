import React from 'react'
import "./Features.css"
import { benefits, steps } from '../../data'
import FeatureCard from '../../component/featureCard/FeatureCard.jsx'


const Features = () => {
    return (
        <>
            
            <div className='features'>
            <h1 className='howItWorks'>How it works....</h1>
                <div className="upperFeature">
                    {steps.map((step)=>{
                        return(
                            <>
                              <FeatureCard featureData={step}/>  
                            </>
                        )
                    })}
                </div>
                <div className="lowerFeature">
                    {benefits.map((benefit)=>{
                        return(
                            <>
                                <FeatureCard featureData={benefit}/> 
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Features