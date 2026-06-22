import React from 'react'

const ClipPathTitle = ({title , color , bg , className , borderColor}) => {
  return (
    <div className='general-title'>
        <div
        style={{
            clipPath:"polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            border: borderColor,
        }}
         className={`${className} border-[.5w] text-nowrap opacity-100 `}>
            <div className="pb-5 md:px-14 px-3 md:pt-0 pt-3 " style={{
                backgroundColor: bg,
            }}>
                <h2 style={{
                    color: color,
                }}>{title}</h2>
            </div>
         </div>
         
      
    </div>
  )
}

export default ClipPathTitle
