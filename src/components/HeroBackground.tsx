type HeroBackgroundProps = {
  imageSrc: string
}

const HeroBackground = ({ imageSrc }: HeroBackgroundProps) => {
  return (
    <>
      <img
        src={imageSrc}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
    </>
  )
}

export default HeroBackground
