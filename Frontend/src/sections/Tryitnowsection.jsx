import React, { useRef, useEffect } from 'react'
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
            yPercent:550,
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
        yPercent:150 , 
        stagger:0.02,
        ease:"power1.inOut",
    })
    })

    // 🚀 FIX: Mobile browsers (khaas kar iOS Safari) muted/looped video ka
    // first frame paint nahi karte jab tak video ek dafa play na ho jaye.
    // Isi wajah se scroll pe khali box + border dikhta tha. Fix: load()
    // call karke currentTime thora sa aage set karo taake browser force
    // se ek frame render kar de, chahe video pause hi kyun na ho.
    useEffect(() => {
        vdRef.current.forEach((video) => {
            if (!video) return;

            const forceFirstFrame = () => {
                try {
                    video.currentTime = 0.01;
                } catch (e) {
                    // Metadata load hone se pehle currentTime set nahi hota kuch browsers mein
                }
            };

            if (video.readyState >= 1) {
                forceFirstFrame();
            } else {
                video.addEventListener('loadedmetadata', forceFirstFrame, { once: true });
            }

            video.load();
        });
    }, []);

    const isMobileRef = useRef(window.innerWidth <= 768);
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const update = (e) => { isMobileRef.current = e.matches; };
        isMobileRef.current = mq.matches;
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    const handleplay = (index) =>{
        if (!isMobileRef.current) { // Sirf Desktop par hover chalay ga
            const video = vdRef.current[index];
            if (video) video.play();
        }
    };
    const handlepause = (index) =>{
        if (!isMobileRef.current) { // Sirf Desktop par hover chalay ga
            const video = vdRef.current[index];
            if (video) video.pause();
        }
    }

    // 🚀 NEW: Mobile ke liye asal "tap to play" — pehle sirf hover tha
    // jo mobile pe kaam hi nahi karta tha
    const handleMobileTap = (index) => {
        if (isMobileRef.current) {
            const video = vdRef.current[index];
            if (video) {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        }
    };

  return (
    <section className="testimonials-section">
        <div className="absolute size-full flex flex-col items-center pt-[5vw] md:mt-0 max-md:mt-20 mt-11 gap-19 md:gap-0 ">
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
                    onClick={() => handleMobileTap(index)}
                    >
                       <video 
                       ref={(el) => (vdRef.current[index]=el)}
                       src={card.src}
                       playsInline
                       webkit-playsinline="true"
                       muted
                       loop
                       preload="metadata"
                       className='size-full object-cover pointer-events-none'
                       ></video>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Tryitnowsection