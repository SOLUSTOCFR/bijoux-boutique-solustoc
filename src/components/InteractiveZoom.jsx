import React, { useState, useRef, useEffect } from 'react'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from './ui/button'

const InteractiveZoom = ({ src, alt, className = "" }) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageRef = useRef(null)
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef.current || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    
    // Calculer la position relative de la souris dans le container
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
  }

  const handleMouseLeave = () => {
    if (isZoomed) {
      setMousePosition({ x: 50, y: 50 }) // Centrer quand la souris sort
    }
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
    if (!isZoomed) {
      setMousePosition({ x: 50, y: 50 }) // Centrer au début du zoom
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg bg-white shadow-inner group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bouton de zoom */}
      <Button
        variant="secondary"
        size="sm"
        className="absolute top-3 left-3 z-20 bg-white/90 hover:bg-white shadow-lg"
        onClick={toggleZoom}
      >
        {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
      </Button>

      {/* Image avec zoom interactif */}
      <div className="relative w-full h-full overflow-hidden cursor-crosshair">
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-contain transition-all duration-300 ${
            isZoomed 
              ? 'scale-[2.5] md:scale-[3] lg:scale-[3.5]' 
              : 'scale-100'
          }`}
          style={{
            transformOrigin: isZoomed 
              ? `${mousePosition.x}% ${mousePosition.y}%` 
              : 'center center',
            objectPosition: 'center top'
          }}
          onLoad={handleImageLoad}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        
        {/* Fallback diamant */}
        <div 
          className="w-full h-full flex items-center justify-center text-6xl md:text-7xl lg:text-8xl text-amber-400" 
          style={{display: imageLoaded ? 'none' : 'flex'}}
        >
          💎
        </div>
      </div>

      {/* Indicateurs de zoom */}
      {isZoomed && (
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs md:text-sm z-10">
          <span className="md:hidden">Bougez pour explorer • Touchez pour réduire</span>
          <span className="hidden md:inline">
            Zoom 350% • Bougez la souris pour explorer
          </span>
        </div>
      )}

      {/* Instructions pour desktop */}
      {!isZoomed && (
        <div className="hidden lg:block absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">
          Cliquez pour zoomer et explorer
        </div>
      )}

      {/* Curseur de loupe visuel sur mobile */}
      {isZoomed && (
        <div 
          className="md:hidden absolute w-8 h-8 border-2 border-white rounded-full pointer-events-none z-20 shadow-lg"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.3)'
          }}
        />
      )}
    </div>
  )
}

export default InteractiveZoom
