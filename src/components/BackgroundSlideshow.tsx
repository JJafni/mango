import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

type BackgroundSlideshowProps = {
  images: string[]
  intervalMs?: number
}

const BackgroundSlideshow = ({
  images,
  intervalMs = 6000,
}: BackgroundSlideshowProps) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [images.length, intervalMs])

  if (images.length === 0) return null

  const driftX = index % 2 === 0 ? '2%' : '-2%'

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Background wallpaper"
            initial={{ opacity: 0, x: '0%' }}
            animate={{ opacity: 1, x: driftX }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeInOut' },
              x: { duration: intervalMs / 1000, ease: 'linear' },
            }}
            className="absolute inset-0 h-full w-full scale-110 object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-black/55" />
    </>
  )
}

export default BackgroundSlideshow
