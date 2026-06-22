import React from 'react'
import ClipPathTitle from '../components/ClipPathTitle'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


const Benefitsection = () => {

    useGSAP(()=>{
        const revealTl = gsap.timeline({
            delay: 1,
            scrollTrigger:{
                trigger:".benefit-section",
                start:"top 60%",
                end:"top top",
                scrub: 1.5,
                
            }
        })

        revealTl.to(".benefit-section .first-title" , {
            duration: 1,
            opacity:1,
            clipPath:"polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
            ease:"circ.out"
        }).to(".benefit-section .second-title" , {
            duration: 1,
            opacity:1,
            clipPath:"polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
            ease:"circ.out"
        }).to(".benefit-section .third-title" , {
            duration: 1,
            opacity:1,
            clipPath:"polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
            ease:"circ.out"
        }).to(".benefit-section .fourth-title" , {
            duration: 1,
            opacity:1,
            clipPath:"polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
            ease:"circ.out"
        })
    })




  return (
    <section className='benefit-section'>
        <div className="container mx-auto pt-20">
            <div className="col-center">
                <p className='text-3xl'>Why ADA Scanner?</p>
                <div className="mt-20 col-center">
                    <ClipPathTitle 
                     title={"Scan Websites"}
                     color={"#faeade"}
                     bg={"orange"}
                     className={"first-title"}
                     borderColor={"#222123"}
                    />
                     <ClipPathTitle 
                     title={"Detect WCAG Errors"}
                     color={"#222123"}
                     bg={"#faeade"}
                     className={"second-title"}
                     borderColor={"#222123"}
                    />
                     <ClipPathTitle 
                     title={"Accessibility Report"}
                     color={"#faeade"}
                     bg={"black"}
                     className={"third-title"}
                     borderColor={"#222123"}
                    />
                     <ClipPathTitle 
                     title={"Fix Suggestions"}
                     color={"orange"}
                     bg={"blue"}
                     className={"fourth-title"}
                     borderColor={"#222123"}
                    />
                    
                </div>
                <div className="md:mt-0 mt-10">
                    <p className='text-3xl mb-5' >And Much More ...</p>
                </div>

                
            </div>
        </div>
        
    </section>
  )
}

export default Benefitsection
