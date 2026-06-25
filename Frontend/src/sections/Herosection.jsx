import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { SplitText } from "gsap/all"
import { useMediaQuery } from "react-responsive";
import Eyesthree from "../constants/Eyesthree";



const Herosection = () => {

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    })

    const isTablet = useMediaQuery({
        query: "(max-width: 1024px)",
    })


    useGSAP(() => {
        const titleSplit = SplitText.create(".hero-title", { type: "chars" });


        const tl = gsap.timeline({
            delay: 2.4,
        })
        tl.to(".hero-content", {
            opacity: 1,
            y: 0,
            ease: "power1.inOut",
        }).to(".hero-text-scroll", {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out"
        }, "-0.1").from(titleSplit.chars, {
            yPercent: 200,
            stagger: 0.1,
            ease: "power2.out"
        }, "-0.01").to(".order-btn", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 3,
            ease: "power1.inOut",
        }, "-0.01").from(".eyes", {
            scale: 0,
            yPercent:"-60",
            duration: 1,
            ease: "circ.inOut",
        } , "1.7")
        const heroTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-container",
                start: "1% top",
                end: "bottom top",
                scrub: true,

            }
        })
        heroTl.to(".hero-container", {
            rotate: 20,
            scale: 0.1,
            yPercent: 30,
            ease: "power1.inOut"
        })

        const vdTl = gsap.timeline({
            delay: 3,
        })
        vdTl.from(".hero-vd", {
            // scale: 1,
            opacity: 0,
            duration: 3.5,
            ease: "power1.inOut",
        })

    })

    return (
        <div>
            <section className='bg-blue-900'>
                <div className='hero-container'>
                    <div style={{
                        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                    }} className="order-btn md:ml-[80%] ml-[70%] max-md:ml-[60%] relative   flex  justify-center z-5000   ">
                        <button onClick={()=>{
                            window.location.href = "/api/login";
                        }}  className=" btn   md:font-bold md:h-10 md:w-25 md:mt-6  md:border-r-3 md:rounded-full md:mr-2  text-milk bg-orange-400 transition-all duration-1000 hover:text-orange-400 md:hover:border-r-9 hover:bg-blue-700 hover:cursor-pointer font-bold h-10 max-md:w-50 max-md:mt-6  border-r-3 rounded-full mr-2  hover:border-r-9   "
                        >LOGIN  </button>
                        <button onClick={()=>{
                            window.location.href = "/api/register";
                        }} className=" btn md:font-bold md:h-10 md:w-25 md:mt-6  md:border-r-3 md:rounded-full   text-milk bg-orange-400 transition-all duration-1000 hover:text-orange-400 md:hover:border-r-9 hover:bg-blue-700 hover:cursor-pointer font-bold h-10 max-md:w-50 max-md:mt-6  border-r-3 rounded-full hover:border-r-9  "
                        >SIGN UP </button>
                    </div>
                    {!isMobile && !isTablet && (
    <>
        <div className="eyes absolute top-10 md:translate-x-281 translate-x-85 max-md:w-[20px] max-md:h-[20px] md:w-[120px] md:h-[120px] z-50 md:scale-100 scale-90">
            <Eyesthree />
        </div>
        <div className="eyes absolute top-10 md:translate-x-307 translate-x-105 w-[20px] h-[20px] md:w-[120px] md:h-[120px] z-50 md:scale-100 scale-90">
            <Eyesthree />
        </div>
    </>
)}
                    {
                        isTablet ? (
                            <> {
                                isMobile && (<video src="\videos\Disable.mp4" autoPlay loop playsInline muted className="hero-vd absolute bottom-0  -translate-x-2 -translate-y-45  object-auto scale-240"  />)
                            }
                               
                            </>
                        ) : (
                            <video src="\videos\Disable.mp4" className="hero-vd absolute inset-0 h-full w-full object-cover scale-120 -translate-y-3 "
                                autoPlay
                                playsInline
                                muted
                                loop
                            />
                        )}
                    <div className='hero-content opacity-0'>
                        <div className='overflow-hidden'>
                            <h1 className='hero-title'>ADA Compliance Scanner</h1>
                        </div>
                        <div style={{
                            clipPath: "polygon(50% 0, 0% 0, 0% 100%, 100% 100%)",
                        }}
                            className="hero-text-scroll">
                            <div className="hero-subtitle max-md:text-[1.5rem]">
                                <h1>Make your website accessible for everyone</h1>
                            </div>
                        </div >
                        <h2 className="hhh" >
                            No one should be left behind online. With our ADA Compliance Scanner, we make sure websites are accessible and fair for all users.
                        </h2>
                        <div className="hero-button">
                            <p onClick={()=>{
                                window.location.href = "/api/login";
                            }}  >Scan Now </p>
                        </div>
                    </div>
                </div >

            </section>
        </div>
    )
}

export default Herosection
