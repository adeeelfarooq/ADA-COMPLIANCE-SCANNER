import React from 'react'
import Howitworksslider from '../components/Howitworksslider'
import Howitworkstitle from '../components/Howitworkstitle'

const Howitworkssection = () => {
  return (
    <section className='flavor-section max-md:mb-20'>
        <div className="h-full flex lg:flex-row flex-col items-center relative">
            <div className="lg:w-[57%] flex-none h-80 lg:h-full  md:mt-15 mt-0">
                <Howitworkstitle/>
            </div>
            <div className="h-full">
                <Howitworksslider/>
            </div>
            
        </div>
    </section>
  )
}

export default Howitworkssection 
