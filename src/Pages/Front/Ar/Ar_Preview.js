import React from 'react'
import "@google/model-viewer/dist/model-viewer";
function Ar_Preview() {
  return (
    <section className='ar w-full bg-white p-5 text-black relative h-[90vh]'>
      <model-viewer
          src={process.env.PUBLIC_URL+ '/assets/Model2.glb'}
          ios-src={process.env.PUBLIC_URL+ '/assets/model.usdz'}
          alt="A 3D model of an People"
          camera-controls
          auto-rotate
          auto-play
          ar ar-scale="fixed"
          ar-modes="webxr scene-viewer quick-look"
          touch-action="pan-y"

          xr-environment
          
        ></model-viewer>
    </section>


  )
}

export default Ar_Preview