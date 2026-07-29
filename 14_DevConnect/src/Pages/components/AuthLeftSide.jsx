import React from 'react'

function AuthLeftSide({title, titleDesc, image, infoCards}) {
  return (
    <>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <h3 className='text-[14px] text-gray-600'>{titleDesc}</h3>
        <div>
          <img src={image} alt="" width="400px" />
        </div>
        {infoCards.map((card) => (
            <div className='flex items-center w-full gap-3 justify-center' key={card.title}>
              <div>
                <img src={card.img} alt="" width="30px"/>
              </div>
              <div className='w-fit min-w-50'>
                <h4 className='text-[14px] font-semibold'>{card.title}</h4>
                <h4 className='text-[12px] text-gray-600'>{card.desc}</h4>
              </div>
            </div>
        ))}
    </>
  )
}

export default AuthLeftSide