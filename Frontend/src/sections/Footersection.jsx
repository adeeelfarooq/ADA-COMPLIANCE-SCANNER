import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import React from 'react'



const Footersection = () => {

    useGSAP(() => {
        const Split = SplitText.create(".wecare" , {type: "chars"})


        const footerimg = gsap.timeline({
            delay: 0,
            scrollTrigger: {
                trigger: ".footer-section",
                start: "center 50%",
                end: "bottom bottom",

                

            }

        })
        footerimg.from(Split.chars,{
            yPercent: 200,
            stagger: 0.1,
            ease: "power2.inOut"
        })

         const footertitle = gsap.timeline({
            delay: 0,
            scrollTrigger: {
                trigger: ".footer-section",
                start: "center 50%",
                end: "bottom bottom",   
                scrub: true,
            }

        })
        footertitle.from(".Ada", {
            yPercent: "-115",
            ease: "power1.inOut",

        })

        


    })
    return (
        <section className='footer-section ' >
            <img src="\images\footer-dip.png" alt="" className='w-full max-md:-mt-1  object-cover translate-y-1' />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-transparent "></div>

            <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
                <div className="overflow-hidden ">
                    <h1 className='general-title wecare relative z-3000 text-center text-milk py-5 md:-ml-0 -ml-2   '>#WECAREFORALL</h1>
                </div>

                <img className=' Ada absolute -ml-17 scale-30 -translate-y-107 md:ml-40 md:-translate-y-60 md:scale-80 mix-blend-plus-darker' src='\images\Ada-footer-1.png' />
                <img className=' Ada absolute ml-72 scale-30 -translate-y-107 md:ml-230 md:-translate-y-60 md:scale-80 mix-blend-plus-darker z-100' src='\images\Ada-footer-2.png' />
                <img className=' Ada absolute ml-85 scale-30 -translate-y-107 md:ml-282 md:-translate-y-60 md:scale-80 mix-blend-plus-darker' src='\images\Ada-footer-3.png' />
                {/* <video src="\videos\Walking_hand_3D.mp4"
                    autoPlay
                    playsInline
                    muted
                    loop
                    className=' ftrvd absolute top-75 -right-205 object-contain mix-blend-screen h-80 z-0 w-dvw scale-122'

                ></video> */}


                <div className='flex-center gap-5 md:relative absolute md:translate-x-0 translate-x-35 z-10 md:mt-20 mt-5'>
                    <div className="social-btn">
                        <img src="\images\yt.svg" alt="" />
                    </div>
                    <div className="social-btn">
                        <img src="\images\insta.svg" alt="" />
                    </div>
                    <div className="social-btn">
                        <img src="\images\tiktok.svg" alt="" />
                    </div>

                </div>

                <div className="md:mt-49 mt-25 md:px-1 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium">
                    <div className="flex items-center md:gap-16 gap-5 ">
                        <div>
                            <p>ADA Compliance Scanner</p>

                        </div>

                        <div>
                            <p>Resources</p>
                            <p>WCAG Guidelines</p>
                            <p>Best Practices</p>
                            <p>Tutorials</p>
                        </div>

                        <div>
                            <p>Support</p>
                            <p>Contact Us</p>
                            <p>Report Issue</p>
                            <p>FAQs</p>
                        </div>
                    </div>
                    <div className="max-w-lg ">
                        <p>Get Exclusive Early Access</p>
                        <p>Stay informed about accessibility reports, product updates, events & more!</p>

                    </div>
                    <br />
                    <br />
                    <br />

                    <div className="copyright-box">
                        <p>Copyright © 2025 ADA Scanner - All Rights Reserved</p>
                        <div className="flex item-center gap-7">
                            <p>Privacy Policy</p>
                            <p>Terms Of Services</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Footersection
