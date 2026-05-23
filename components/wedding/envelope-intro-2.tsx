"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function EnvelopeIntro2({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false)
  const [isVisibleEnvelope, setIsVisibleEnvelope] = useState(true)

  const handleOpen = (value: boolean) => {
    if (value === false) {
      setOpen(true)
    }
  }

  const handleAnimationComplete = () => {
    setIsVisibleEnvelope(false)
  }

  const handleLastAnimationComplete = () => {
    onOpen()
  }

  return (
    <div className="h-screen w-full flex flex-col gap-10 items-center justify-center bg-[#f5f1ea] overflow-hidden">
      <motion.div
        animate={{
          opacity: open ? 0 : 1,
        }}
        transition={{
          duration: 0.35,
        }}
        className=""
      >
        <p className="pointer-events-none max-w-xs text-center font-sans text-[11px] font-light uppercase tracking-[0.35em] text-neutral-600 md:text-xs">
          Toque no selo para abrir
        </p>
      </motion.div>

      <div
        className="relative w-[350px] h-[250px] cursor-pointer"
        /*     onClick={() => setOpen((prev) => !prev)} */
        onClick={() => handleOpen(open)}
        style={{ perspective: 2000 }}
      >
        {/* CARTA */}
        <motion.div
          initial={false}
          animate={{
            opacity: open ? 1 : 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* animação subir carta */}
          <motion.div
            animate={{
              y: open ? -180 : 0,
            }}
            transition={{
              delay: 0.8,
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
            }}
            initial={false}
            onAnimationComplete={() => {
              handleAnimationComplete()
            }}
            className="absolute left-1/2 bottom-[60px] w-[240px] h-[150px] z-[4] -translate-x-1/2"
          >

            {/* animação zoom carta */}
            {open && (
              <motion.div
                initial={{
                  position: "absolute",
                  left: "50%",
                  bottom: "60px",
                  x: "-50%",
                  y: 0,
                  width: 240,
                  height: 150,
                  padding: 10,
                  scale: 1,
                  borderRadius: 6,
                }}
                animate={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-32.8%",
                  width: "100vw",
                  height: "94vh",
                  scale: 1,
                  borderRadius: 0,
                  padding: 0,
                }}
                transition={{
                  delay: 1.8,
                  duration: 1.2,
                  ease: [0.76, 0, 0.24, 1],
                }}
                onAnimationComplete={() => {
                  console.log("Animation complete")
                  handleLastAnimationComplete()
                }}
                className="z-[999] bg-white rounded-md shadow-2xl"
              >
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/photos/main.jpg')` }}>
                </div>
              </motion.div>
            )}
            {!open && (
              <div className="w-full z-[12] p-4 h-full rounded-[6px] bg-white shadow-xl border border-neutral-200 flex flex-col items-center justify-center">
                <img src="/photos/main.jpg" alt="Envelope" className="w-full h-full object-cover" />
              </div>
            )
            }
          </motion.div>
        </motion.div>

        {/* ENVELOPE BASE */}
        {/* {isVisibleEnvelope && ( */}
        <div className={`absolute inset-0 ${isVisibleEnvelope ? "" : "z-0"}`}>

          {/* FUNDO */}
          <div className="absolute inset-0 bg-[#e9e1d5] rounded-md shadow-2xl " />

          {/* ABA ESQUERDA */}
          <div
            className="absolute  left-0 bottom-0 w-[50%] h-full bg-[#ddd3c5] z-10"
            style={{
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
            }}
          />

          {/* ABA DIREITA */}
          <div
            className="absolute right-0 bottom-0 w-[50%] h-full bg-[#e3dacd] z-10"
            style={{
              clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
            }}
          />

          {/* ABA INFERIOR */}
          <div
            className="absolute  bottom-0 left-0 w-full h-[55%] bg-[#f1e9de] z-10"
            style={{
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
            }}
          />
        </div>
        {/*   )} */}

        {/* TAMPA */}
        <motion.div
          animate={{
            zIndex: open ? 1 : 7,
          }}
          transition={{
            delay: 2,
            duration: 10,
            ease: [0.76, 0, 0.24, 1],
          }}
          className={`absolute top-0 left-0 w-full h-[125px] origin-top  z-[7]`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{
              rotateX: open ? 180 : 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
            className={`absolute top-0 left-0 w-full h-[125px] origin-top z-[10] `}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Frente */}
            <div
              className="absolute inset-0 bg-[#efe7dc]"
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                backfaceVisibility: "hidden",
              }}
            />

            {/* Verso */}
            <div
              className="absolute inset-0 bg-[#d9cebf]"
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* SELO */}
        <motion.div
          animate={{
            scale: open ? 0 : 1,
            opacity: open ? 0 : 1,
          }}
          transition={{
            duration: 0.35,
          }}
          className="z-[11] absolute top-[-95px]"/* absolute left-1/2 top-[92px] z-[10] -translate-x-1/2 */
        >
          {/* <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-red-400 to-red-700 border-[5px] border-red-300 shadow-2xl flex items-center justify-center">
            <span className="text-white font-serif text-xl">
              N&D
            </span>
          </div> */}

          <img src="/photos/selo.png" alt="Selo" className="" />
        </motion.div>

        <img src="/photos/flores.png" alt="Flores" className={`absolute top-[-100px] ${isVisibleEnvelope ? "z-[11]" : "z-0"}`}/>

      {/*   <img src="/photos/envelope.png" alt="Flores" className={`absolute top-[-100px] ${isVisibleEnvelope ? "z-[10]" : "z-0"}`}/> */}
      </div>
    </div>
  )
}