import { useState } from 'react'
import { X, ZoomIn, ZoomOut, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const ProductDetailModal = ({ product, categories, onClose, onAddToCart, onToggleFavorite, favorites, isOpen }) => {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 })

  if (!isOpen || !product) return null

  const category = categories?.find(cat => cat.slug === product.category) || { name: product.category, icon: '💎' }
  const discountPercentage = Math.round((1 - product.pricePromo / product.pricePublic) * 100)
  const isFavorite = favorites?.includes(product.id) || false

  const toggleImageSize = () => {
    setIsImageEnlarged(!isImageEnlarged)
    if (!isImageEnlarged) {
      setZoomLevel(1)
      setImagePosition({ x: 50, y: 50 })
    }
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1))
    if (zoomLevel <= 1.5) {
      setImagePosition({ x: 50, y: 50 })
    }
  }

  const handleMouseMove = (e) => {
    if (zoomLevel > 1 && isImageEnlarged) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setImagePosition({ 
        x: Math.max(0, Math.min(100, x)), 
        y: Math.max(0, Math.min(100, y)) 
      })
    }
  }

  const handleWheel = (e) => {
    if (isImageEnlarged) {
      e.preventDefault()
      if (e.deltaY < 0) {
        handleZoomIn()
      } else {
        handleZoomOut()
      }
    }
  }

  const handleAddToCart = () => {
    onAddToCart(product)
    // Optionnel: fermer la modal après ajout au panier
    // onClose()
  }

  return (
    <div className="product-modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="product-modal-content bg-white rounded-lg shadow-xl max-w-6xl w-full h-full sm:h-auto sm:max-h-[95vh] overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full sm:max-h-[calc(95vh-0px)]">
          {/* Section Image avec Zoom */}
          <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 flex items-start justify-center pt-8 min-h-[400px] lg:min-h-[600px]">
            {/* Bouton fermer - repositionné */}
            <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white shadow-md"
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Contrôles de zoom */}
              {product.image && (
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleImageSize}
                    className="bg-white/90 hover:bg-white shadow-md"
                  >
                    {isImageEnlarged ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                  </Button>
                  {isImageEnlarged && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 3}
                        className="bg-white/90 hover:bg-white shadow-md"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 1}
                        className="bg-white/90 hover:bg-white shadow-md"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              )}

              {/* Image avec zoom avancé */}
              <div 
                className={`relative transition-all duration-300 ${
                  isImageEnlarged 
                    ? 'w-full h-[calc(100vh-200px)] cursor-crosshair' 
                    : 'w-full max-w-lg h-[400px] cursor-pointer'
                } rounded-lg bg-white shadow-inner overflow-hidden`}
                onClick={!isImageEnlarged ? toggleImageSize : undefined}
                onMouseMove={handleMouseMove}
                onWheel={handleWheel}
                onMouseLeave={() => setImagePosition({ x: 50, y: 50 })}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-200"
                    style={{
                      objectPosition: 'center top',
                      transform: isImageEnlarged ? `scale(${zoomLevel})` : 'scale(1)',
                      transformOrigin: `${imagePosition.x}% ${imagePosition.y}%`
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl text-amber-400">
                    💎
                  </div>
                )}
              </div>

              {/* Indicateur de zoom */}
              {isImageEnlarged && (
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
                  {zoomLevel > 1 && <span>• Bougez la souris</span>}
                </div>
              )}
              
              {/* Instructions de zoom */}
              {isImageEnlarged && zoomLevel === 1 && (
                <div className="absolute bottom-4 right-4 bg-amber-600/90 text-white px-3 py-1 rounded-full text-sm">
                  Molette ou boutons +/- pour zoomer
                </div>
              )}
            </div>

            {/* Section Détails */}
            <div className="p-6 lg:p-8 overflow-y-auto max-h-[95vh] lg:max-h-none">
              <div className="space-y-6">
                {/* En-tête produit */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {category && (
                        <Badge variant="outline" className="mb-3">
                          {category.icon} {category.name}
                        </Badge>
                      )}
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h1>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleFavorite(product.id)}
                      className="ml-4"
                    >
                      <Heart 
                        className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                      />
                    </Button>
                  </div>

                  {/* Évaluations */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(4.8/5 - 127 avis)</span>
                  </div>
                </div>

                {/* Prix */}
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-amber-600">
                      {product.pricePromo.toFixed(2)}€
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {product.pricePublic.toFixed(2)}€
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500 text-white">
                      -{discountPercentage}% de réduction
                    </Badge>
                    <span className="text-green-600 font-medium">
                      Vous économisez {(product.pricePublic - product.pricePromo).toFixed(2)}€
                    </span>
                  </div>
                </div>

                {/* Stock */}
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    {product.stock > 0 ? (
                      <>
                        <span className="font-medium text-green-600">{product.stock} en stock</span>
                        {product.stock < 10 && (
                          <span className="text-orange-600 ml-2">• Stock limité</span>
                        )}
                      </>
                    ) : (
                      <span className="font-medium text-red-600">Rupture de stock</span>
                    )}
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <div className="text-gray-700 space-y-2">
                    <p>
                      {product.description || `Magnifique ${product.name.toLowerCase()} en finition dorée. 
                      Bijou élégant et raffiné, parfait pour sublimer votre style au quotidien ou lors d'occasions spéciales.`}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">Matériau:</span>
                        <p className="text-sm text-gray-600">Métal doré</p>
                      </div>
                      <div>
                        <span className="font-medium">Finition:</span>
                        <p className="text-sm text-gray-600">Dorée brillante</p>
                      </div>
                      <div>
                        <span className="font-medium">Style:</span>
                        <p className="text-sm text-gray-600">Moderne & Élégant</p>
                      </div>
                      <div>
                        <span className="font-medium">Occasion:</span>
                        <p className="text-sm text-gray-600">Quotidien & Soirée</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4 pt-6 border-t">
                  <Button 
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 text-lg"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="py-2">
                      <Heart className="w-4 h-4 mr-2" />
                      Favoris
                    </Button>
                    <Button variant="outline" className="py-2">
                      <Tag className="w-4 h-4 mr-2" />
                      Comparer
                    </Button>
                  </div>
                </div>

                {/* Informations de livraison */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🚚 Livraison</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Livraison gratuite dès 20€ d'achat</p>
                    <p>• Expédition sous 24-48h</p>
                    <p>• Retour sous 7 jours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal
