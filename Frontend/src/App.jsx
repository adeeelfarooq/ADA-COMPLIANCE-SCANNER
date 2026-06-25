
import NavBar from './components/NavBar'
import Herosection from './sections/Herosection'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import Messagesection from './sections/Messagesection';
 
import { useGSAP } from '@gsap/react';

import Benefitsection from './sections/Benefitsection';
import Footersection from './sections/Footersection';
import Howitworkssection from './sections/Howitworkssection';
import Tryitnowsection from './sections/Tryitnowsection';
import AccessibilityStatsSection from './sections/AccessibilityStatsSection.jsx';



gsap.registerPlugin(ScrollTrigger , ScrollSmoother);

const App = () => {

  useGSAP(()=>{
  ScrollSmoother.create({
    smooth: 3,
    effects: true,
    normalizeScroll: true,
  } )
})  
  return (
    
      
        <main>
          <NavBar />
          
          <div id="smooth-wrapper">   
      <div id="smooth-content">
          <Herosection />
          <Messagesection />
          <Howitworkssection/>
          <AccessibilityStatsSection/>
          <div>
            <Benefitsection/>
          <Tryitnowsection/>
          
          </div>
          <Footersection/>
          
          </div>
          </div>
        </main>
      
    
  
  )
}

export default App
