import { useMediaQuery } from "react-responsive"
import { accessibilityStats } from "../constants"
import { useEffect, useState } from "react"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all"
import gsap from "gsap"


const AccessibilityStatsSection = () => {

    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    })

    const [lists, setLists] = useState(accessibilityStats);
    useEffect(() => {
        if (isMobile) {
            setLists(accessibilityStats.slice(0, 3));
        }
        else {
            setLists(accessibilityStats);
        }
    }, [isMobile]);

    useGSAP(() => {
        const firstTl = SplitText.create(".nutrition-title", {
            type: "chars",

        })

        const secondPara = SplitText.create(".nutrition-section p ", {
            type: "words, lines",
            linesClass: "paragraph-line "

        });

        const Tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".nutrition-section",
                start: "top 75%",


            }
        });
        Tl.from(firstTl.chars, {
            yPercent: -500,



            ease: "power1.inOut",
            stagger: "0.01",

        }, 0).from(secondPara.words, {
            yPercent: 300,
            rotate: 3,
            ease: "power1.inOut",
            duration: 1,
            stagger: "0.01",
        }, ">")

        const gTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".nutrition-section",
                start: "top 75%",


            }
        })

        gTl.to(".nutrition-text-scroll", {
            duration: 1,
            opacity: 1,

            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power1.inOut",
        } ,"0.5")



    })


    return (
        <section className='nutrition-section'>

            <img src="\images\bgbg.jpeg" alt="" className='big-img max-md:scale-x-120 max-md:scale-400 max-md:top-[145%] ' />
            <div className="flex md:flex-row flex-col justify-between  md:px-10 px-5 max-md:px-0 mt-14 md:mt-0">
                <div className="relative inline-block md:translate-y-20">
                    <div className="general-title relative flex flex-col items-center gap-24 max-md:scale-77 max-md:left-[-7%]  max-md:-mt-2">
                        <div className=" place-self-start ">
                            <h1 className="nutrition-title ">ADA Accessibility  </h1>
                        </div>
                        <div style={{
                            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                        }} className="nutrition-text-scroll place-self-start">
                            <div className="bg-orange-400 pb-5 md:pt-0 pt-3 md:px-20 px-10  inline-block">
                                <h2 className='text-milk-yellow '> Scan Report</h2>
                            </div>
                        </div>

                    </div>
                </div>
                <div className=" flex md:justify-center md:items-center justify-end items-end md:translate-y-5 -translate-y-30  ">
                    <div className="md:max-w-xs max-w-[200px] max-md:max-w-[230px]   ">
                        <p className='md:text-lg md:text-right text-xs max-md:mt-8 pl-15  max-md:translate-x-6  max-md:scale-65 text-balance font-paragraph md:-mt-0 -mt-3   '>This page has been analyzed for accessibility issues including color contrast, alt text, ARIA roles, and semantic structure.</p>
                    </div>
                </div>
                <div className="nutrition-box">
                    <div className="list-wrapper">
                        {
                            lists.map((nutrient, index) => (
                                <div key={index} className=" relative flex-1 col-center ">
                                    <div >
                                        <p className="md:text-lg font-paragraph "> {nutrient.label}</p>

                                        <p className="md:text-4xl text-2xl tracking-tighter font-bold">{nutrient.amount}</p>
                                    </div>
                                    {
                                        index !== lists.length - 1 && (<div className="spacer-border" />)
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccessibilityStatsSection
