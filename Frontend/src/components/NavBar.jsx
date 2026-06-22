import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";


const NavBar = () => {
  const wrapperRef = useRef(null);
  const isMobile = useMediaQuery({
          query: "(max-width: 768px)",
      })

  useGSAP(() => {
    const tl = gsap.timeline();

    
    tl.set(wrapperRef.current, {
      position: "fixed",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      scale: 3,
      opacity: 0,
      zIndex: 9999,
      clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)", // thin vertical line in center
    });

    
    tl.to(wrapperRef.current, {
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // full rectangle
      duration: 1.6,
      ease: "power2.out",
    });

   
    

    
   if(isMobile){
     tl.to(wrapperRef.current, {
      duration: 1,
      top: "1px",
      left: "-25px",
      xPercent: 0,
      yPercent: 0,
      scale: 0.6,
      ease: "power3.inOut",
    });
   }
   else{
     tl.to(wrapperRef.current, {
      duration: 1,
      top: "10px",
      left: "10px",
      xPercent: 0,
      yPercent: 0,
      scale: 0.8,
      ease: "power3.inOut",
    });
   }
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 md:p-3 p-3">
      
      <div ref={wrapperRef} className="flex flex-col items-center overflow-hidden">
        
        <img
          src="images/Logoada.png"
          alt="Navbar-Logo"
          className="w-40 h-16 md:h-20"
        />

        
        <div className="flex mt-1 text-white font-bold text-sm md:text-lg tracking-wider">
          <span className="px-2 py-1 bg-blue-600 rounded-l-md">ADA</span>
          <span className="px-2 py-1 bg-orange-500 rounded-r-md">SCANNER</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
