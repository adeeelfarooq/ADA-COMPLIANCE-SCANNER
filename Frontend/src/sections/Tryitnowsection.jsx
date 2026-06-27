import React, { useRef } from 'react'
import { cards } from '../constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Tryitnowsection = () => {

    const vdRef = useRef([]);


    useGSAP(()=>{
        

        const Tl = gsap.timeline({
            scrollTrigger:{
                trigger:".testimonials-section",
                start:"top 5%",
                end:"100% top",
                
                
            }
        })

        Tl.from(".testimonials-section .first-title" , {
            xPercent:350,
            duration: 1,
            
        } , ).from(".testimonials-section .second-title" , {
            xPercent:-600,
            duration: 1,
        } , "<").from(".testimonials-section .third-title" , {
            yPercent:350,
            duration: 1,
        } , "<")

        const pinTl = gsap.timeline({
        scrollTrigger:{
            trigger:".testimonials-section",
            start:"10% top",
            end:"100% top",
            scrub: 1.5,
            pin: true,
            
            
        }
    }) 

    pinTl.from(".vd-card" , {
        yPercent:115 , 
        stagger:0.02,
        ease:"power1.inOut",
    })
    })

    

    const handleplay = (index) =>{
        const video = vdRef.current[index];
        video.play();
    };
    const handlepause = (index) =>{
        const video = vdRef.current[index];
        video.pause();
    }
  return (
    <section className="testimonials-section max-md:mt-30">
        <div className="absolute size-full flex flex-col items-center pt-[5vw] md:mt-0 mt-11 gap-19 md:gap-0 ">
            <h1 className='text-blue-600 text first-title md:ml-200 ml-80 max-md:ml-70'>Try</h1>
            <h1 className='text-orange-400 second-title '>It</h1>
            <h1 className='text-blue-600 third-title m md:mr-200 mr-75 max-md:mr-65'>Now</h1>
        </div>
        <div className="pin-box">
            {
                cards.map((card , index)=>(
                    <div key={index} className={`vd-card ${card.translation} ${card.rotation} `}
                    onMouseEnter={()=> handleplay(index)} 
                    onMouseLeave={()=> handlepause(index)}
                    >
                       <video 
                       ref={(el) => (vdRef.current[index]=el)}
                       src={card.src}
                       playsInline
                       muted
                       loop
                       className='sized-full object-cover  '
                       ></video>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Tryitnowsection
