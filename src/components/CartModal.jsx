import React from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const CartModal = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, cartTotal, onProceedToCheckout }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:rounded-lg shadow-xl sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 sm:p-6 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Mon Panier ({cart.reduce((sum, item) => sum + item.quantity, 0)} article{cart.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 's' : ''})
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 w-10 h-10 p-0"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full sm:max-h-[calc(90vh-200px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4">
              <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Votre panier est vide</h3>
              <p className="text-sm sm:text-base text-gray-500 mb-6">Découvrez nos magnifiques bijoux dorés</p>
              <Button onClick={onClose} className="bg-amber-500 hover:bg-amber-600 h-10 sm:h-12">
                Continuer mes achats
              </Button>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-3 sm:space-x-4 bg-gray-50 rounded-lg p-3 sm:p-4">
                    {/* Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-xl sm:text-2xl">💍</div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm sm:text-base text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{item.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-bold text-amber-600 text-sm sm:text-base">{item.pricePromo.toFixed(2)}€</span>
                        {item.originalPrice > item.pricePromo && (
                          <span className="text-xs sm:text-sm text-gray-400 line-through">
                            {item.originalPrice.toFixed(2)}€
                          </span>
                        )}
                      </div>
                      
                      {/* Quantity Controls - Mobile Layout */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                            className="w-8 h-8 p-0"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        {/* Subtotal & Remove */}
                        <div className="flex items-center space-x-2">
                          <div className="font-bold text-gray-900 text-sm">
                            {(item.pricePromo * item.quantity).toFixed(2)}€
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 w-8 h-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 border-t bg-white p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-medium text-gray-900">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-amber-600">{cartTotal.toFixed(2)}€</span>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full sm:flex-1 h-10 sm:h-12"
                  >
                    Continuer mes achats
                  </Button>
                  <Button
                    className="w-full sm:flex-1 bg-amber-500 hover:bg-amber-600 h-12 text-base sm:text-lg font-medium"
                    disabled={cart.length === 0}
                    onClick={() => {
                      onClose()
                      onProceedToCheckout()
                    }}
                  >
                    Procéder au paiement - {cartTotal.toFixed(2)}€
                  </Button>
                </div>
                
                <div className="mt-3 text-center">
                  <p className="text-xs sm:text-sm text-gray-500">
                    🚚 Livraison gratuite dès 20€ • 📦 Retour sous 7 jours
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartModal
