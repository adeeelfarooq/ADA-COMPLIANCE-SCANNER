import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import React from 'react'

const Howitworkstitle = () => {

    useGSAP(()=>{
        const firstF = SplitText.create(".first-text-split" , {
            type: "chars",
        })
        const secondF = SplitText.create(".second-text-split" , {
            type: "chars",
        })
        gsap.from(firstF.chars , {
            yPercent: 200 , 
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger:{
                trigger: ".flavor-section",
                start: "top 30%",
                
            }
        })
        gsap.to(".flavor-text-scroll" , {
            duration: 1.5 , 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scrollTrigger:{
                trigger:".flavor-section",
                start: "top 20%",
                
                
            }
        })
        gsap.from(secondF.chars , {
            yPercent: 200 , 
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger:{
                trigger: ".flavor-section",
                start: "top 1%",
                
                
            }
        })
    })
  return (
    <div className='general-title col-center h-full 2xl:gap-32 xl:gap-14 gap-16 '>
      <div className="overflow-hidden 2xl:py-0 py-3 translate-y-2  first-text-split">
        <h1 >How</h1>
      </div>
      <div style={{
        clipPath:"polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      }} className="flavor-text-scroll mb-7">
        <div className="bg-orange-400 pb-2 2xl:pt-0 pt-3 2xl:px-5 px-3   ">
            <h2 className='text-milk ' >It</h2>
        </div>
        
      </div>
      <div className=" overflow-hidden 2xl:py-0 py-5 -translate-y-7  second-text-split">
        <h1>Works? </h1>
      </div>
    </div>
  )
}

export default Howitworkstitle 
