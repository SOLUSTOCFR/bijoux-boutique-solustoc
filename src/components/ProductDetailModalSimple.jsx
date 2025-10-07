import React, { useState } from 'react'
import { X, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, ZoomIn, RotateCcw as Reset } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

const ProductDetailModal = ({ product, categories, onClose, onAddToCart, onToggleFavorite, favorites, isOpen }) => {
  if (!isOpen || !product) return null

  const isFavorite = favorites.includes(product.id)
  const category = categories?.find(cat => cat.id === product.category)
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  const handleAddToCart = () => {
    onAddToCart(product)
  }

  const handleToggleFavorite = () => {
    onToggleFavorite(product.id)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Section Image avec Zoom Interactif Professionnel */}
            <div className="group relative bg-gradient-to-br from-amber-50 to-yellow-50 flex items-start justify-center pt-8 min-h-[400px] lg:min-h-[600px]">
              {/* Bouton fermer */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-30 bg-white/90 hover:bg-white shadow-lg"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Container de zoom interactif */}
              <div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-[300px] md:h-[400px] lg:h-[500px] rounded-lg bg-white shadow-inner overflow-hidden">
                <TransformWrapper
                  initialScale={1}
                  minScale={1}
                  maxScale={4}
                  wheel={{ step: 0.1 }}
                  pinch={{ step: 5 }}
                  doubleClick={{ mode: "toggle", step: 0.7 }}
                  pan={{ 
                    disabled: false,
                    velocityDisabled: true,
                    lockAxisX: false,
                    lockAxisY: false
                  }}
                  limitToBounds={true}
                  centerOnInit={true}
                  smooth={true}
                >
                  {({ zoomIn, zoomOut, resetTransform, instance }) => (
                    <>
                      {/* Contrôles de zoom */}
                      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/90 hover:bg-white shadow-lg w-8 h-8 p-0"
                          onClick={() => zoomIn(0.5)}
                          title="Zoom avant"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/90 hover:bg-white shadow-lg w-8 h-8 p-0"
                          onClick={() => zoomOut(0.5)}
                          title="Zoom arrière"
                        >
                          <ZoomIn className="w-4 h-4 rotate-180" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-white/90 hover:bg-white shadow-lg w-8 h-8 p-0"
                          onClick={() => resetTransform()}
                          title="Réinitialiser"
                        >
                          <Reset className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Image zoomable */}
                      <TransformComponent
                        wrapperClass="w-full h-full"
                        contentClass="w-full h-full flex items-center justify-center"
                      >
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing"
                            style={{ objectPosition: 'center top' }}
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div 
                          className="w-full h-full flex items-center justify-center text-6xl md:text-7xl lg:text-8xl text-amber-400" 
                          style={{display: product.image ? 'none' : 'flex'}}
                        >
                          💎
                        </div>
                      </TransformComponent>

                      {/* Instructions d'utilisation */}
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs md:text-sm z-10">
                        <span className="md:hidden">Pincer pour zoomer • Glisser pour explorer</span>
                        <span className="hidden md:inline">Molette ou boutons pour zoomer • Glisser pour explorer • Double-clic pour basculer</span>
                      </div>

                      {/* Instructions pour desktop */}
                      <div className="hidden lg:block absolute bottom-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        Zoom jusqu'à 400% • Navigation fluide
                      </div>
                    </>
                  )}
                </TransformWrapper>
              </div>
            </div>

            {/* Section Détails */}
            <div className="p-6 lg:p-8 overflow-y-auto max-h-[50vh] lg:max-h-none">
              {/* En-tête produit */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {category?.name || 'Bijou'}
                  </span>
                  {discount > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      -{discount}%
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h2>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl lg:text-3xl font-bold text-amber-600">
                    {product.price.toFixed(2)}€
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice.toFixed(2)}€
                    </span>
                  )}
                </div>

                {/* Étoiles et stock */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">4.8 (127 avis)</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">
                      En stock ({product.stock} disponibles)
                    </span>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3 mb-6">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ajouter au panier - {product.price.toFixed(2)}€
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleToggleFavorite}
                  className={`w-full py-3 ${isFavorite ? 'bg-pink-50 border-pink-200 text-pink-700' : ''}`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-pink-500 text-pink-500' : ''}`} />
                  {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </Button>
              </div>

              {/* Informations de livraison */}
              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4" />
                  <span>Livraison gratuite dès 20€</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-4 h-4" />
                  <span>Retour sous 7 jours</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Magnifique bijou doré de haute qualité, parfait pour sublimer vos tenues. 
                  Fabriqué avec soin et attention aux détails, ce bijou allie élégance et modernité. 
                  Idéal pour un cadeau ou pour vous faire plaisir.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductDetailModal
