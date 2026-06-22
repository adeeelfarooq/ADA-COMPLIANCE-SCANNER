import React, { useRef } from 'react'
import { howitworkslists } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive'

const Howitworksslider = () => {
    const isTablet = useMediaQuery({
        query: "(max-width: 1024px)" ,
    });
    const sliderRef = useRef();
useGSAP(()=>{

    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if(!isTablet){
        const tL = gsap.timeline({
        scrollTrigger:{
            trigger: ".flavor-section",
            start: "2% top",
            pin: true,
            end: `+=${scrollAmount + 1400}px`,
            scrub: true,
        }
    })
    tL.to(".flavor-section" , {
        x: `-${scrollAmount + 1400}px`,
        ease: "power1.inOut",
    })
    }
    
    const titleTl = gsap.timeline({
        scrollTrigger:{
            trigger:".flavor-section",
            start:'top top ',
            end:"bottom 80%",
            scrub: true,
        }
    })
    titleTl.to(".first-text-split" , {
        xPercent: -30,
        ease: "power1.inOut",
    }).to(".flavor-text-scroll" , {
        xPercent: -22,
        ease: "power1.inOut", 

    }, "<").to(".second-text-split" , {
        xPercent: -10,
        ease: "power1.inOut",
    } , "<")
    const elementsTl = gsap.timeline({
        delay: 3,

        scrollTrigger:{
            
            trigger:".flavor-section",
            
            scrub: false,
        }
    })
    elementsTl.from(".elements " , {
        yPercent: -500 , 
        duration: 2.7,
        ease:"power1.inOut",
        
    })

    
    

    
})

  return (
    <div ref={sliderRef} className='slider-wrapper'>
        <div className="flavors">
            {
                howitworkslists.map((flavor)=>(
                    <div key={flavor.Caption} className={`z-30 lg:w-[40vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}>
                        <img src={`/images/${flavor.image}.png`} alt="" className='mt-5 ' />
                        {/* <img src={`images/${flavor.image}.webp`} alt="" className='drinks'/> */}
                        {/* <img  src={`images/${flavor.image}-elements.png`} alt="" className='elements mb-2 scale-60 -translate-y-50'/> */}
                        <h1 className={flavor.trans}> {flavor.Caption} </h1>
                    </div>
                ))
            }
        </div>
      
    </div>
  )
}

export default Howitworksslider
