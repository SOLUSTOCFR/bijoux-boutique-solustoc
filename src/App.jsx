import React, { useState, useMemo } from 'react'
import { ShoppingCart, Search, Star, Filter, Heart, Eye, Settings, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import './App.css'

// Import des données
import allProductsData from './data/all_products_with_photos.json'
import homepageProductsData from './data/homepage_products.json'
import categoriesData from './data/categories.json'

// Import des composants d'administration
import AdminPanel from './components/AdminPanel.jsx'
import ProductDetailModal from './components/ProductDetailModalSimple.jsx'
import AdminHelp from './components/AdminHelp.jsx'
import CartModal from './components/CartModal.jsx'

// Import du footer et des pages
import Footer from './components/Footer.jsx'
import QuiSommesNous from './pages/QuiSommesNous.jsx'
import CGV from './pages/CGV.jsx'
import AProposBijoux from './pages/AProposBijoux.jsx'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [products, setProducts] = useState(homepageProductsData)
  const [allProducts] = useState(allProductsData)
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)
  const [adminClickCount, setAdminClickCount] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productDetailOpen, setProductDetailOpen] = useState(false)
  
  // États pour les pages du footer
  const [quiSommesNousOpen, setQuiSommesNousOpen] = useState(false)
  const [cgvOpen, setCgvOpen] = useState(false)
  const [aproposBijouxOpen, setAproposBijouxOpen] = useState(false)
  
  // État pour la modal du panier
  const [cartModalOpen, setCartModalOpen] = useState(false)

  // Filtrage des produits par catégorie
  const filteredProducts = useMemo(() => {
    // Si aucune catégorie sélectionnée ou "all", afficher les produits de la page d'accueil
    if (selectedCategory === 'all') {
      return products
    }
    
    // Sinon, filtrer tous les produits par catégorie
    return allProducts.filter(product => product.category === selectedCategory)
  }, [products, allProducts, selectedCategory])

  // Fonctions du panier
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const updateProduct = (updatedProduct) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    )
  }

  const handleAdminAccess = () => {
    setAdminClickCount(prev => {
      const newCount = prev + 1
      if (newCount === 3) {
        setAdminPanelOpen(true)
        return 0 // Reset counter
      }
      // Reset counter after 2 seconds if not completed
      setTimeout(() => setAdminClickCount(0), 2000)
      return newCount
    })
  }

  const openProductDetail = (product) => {
    setSelectedProduct(product)
    setProductDetailOpen(true)
  }

  const closeProductDetail = () => {
    setProductDetailOpen(false)
    setSelectedProduct(null)
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.pricePromo * item.quantity), 0)
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-amber-400 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-xl sm:text-2xl font-bold text-amber-600">
                ✨ Bijoux d'<span 
                  onClick={handleAdminAccess}
                  className="cursor-pointer hover:text-amber-700 transition-colors select-none"
                  title={adminClickCount > 0 ? `${adminClickCount}/3 clics pour admin` : 'Cliquez 3 fois pour admin'}
                  style={{userSelect: 'none'}}
                >Or</span>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex bg-amber-100 text-amber-800 text-xs sm:text-sm">
                Promotions jusqu'à -75%
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button 
                size="sm" 
                className="relative bg-amber-500 hover:bg-amber-600 text-white h-10 px-3 sm:px-4"
                onClick={() => setCartModalOpen(true)}
              >
                <ShoppingCart className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Panier</span>
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
              <div className="text-xs sm:text-sm font-medium text-gray-700">
                {cartTotal.toFixed(2)}€
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Catégories Mobile-Optimized */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Catégories</h2>
            <div className="text-xs sm:text-sm text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </div>
          </div>
          
          {/* Scroll horizontal sur mobile */}
          <div className="overflow-x-auto pb-2 -mx-3 px-3">
            <div className="flex space-x-2 min-w-max">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={`whitespace-nowrap h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 ${
                  selectedCategory === 'all' ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'hover:bg-amber-50'
                }`}
              >
                Tous ({allProducts.length})
              </Button>
              
              {categoriesData.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`whitespace-nowrap h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4 ${
                    selectedCategory === category.slug ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'hover:bg-amber-50'
                  }`}
                >
                  {category.icon} {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-2 border-transparent hover:border-amber-200 cursor-pointer" onClick={() => openProductDetail(product)}>
              <CardContent className="p-0">
                <div className="relative">
                  {/* Image du produit */}
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-yellow-200 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => openProductDetail(product)}>
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    ) : null}
                    <div className="text-6xl" style={{display: product.image ? 'none' : 'flex'}}>
                      💎
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.stock < 10 && (
                      <Badge className="bg-red-500 text-white text-xs">
                        Stock limité
                      </Badge>
                    )}
                    <Badge className="bg-green-500 text-white text-xs">
                      -{Math.round((1 - product.pricePromo / (product.originalPrice || product.pricePromo)) * 100)}%
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 bg-white/90"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(product.id)
                    }}
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                    />
                  </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 bg-white/90"
                      onClick={(e) => {
                        e.stopPropagation()
                        openProductDetail(product)
                      }}
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </div>

                <div className="p-2 sm:p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs mb-2">
                      {categoriesData.find(cat => cat.slug === product.category)?.name || product.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-xs sm:text-sm mb-2 line-clamp-2 text-gray-800 leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex flex-col">
                      <span className="text-sm sm:text-lg font-bold text-amber-600">
                        {product.pricePromo.toFixed(2)}€
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                          {product.originalPrice.toFixed(2)}€
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                      <span className="text-xs sm:text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm text-gray-600">
                      Stock: {product.stock}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm py-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">
                      {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                    </span>
                    <span className="sm:hidden">
                      {product.stock === 0 ? 'Rupture' : 'Ajouter'}
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </section>



      {/* Panel d'administration */}
      <AdminPanel
        products={products}
        onProductUpdate={updateProduct}
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
      />

      {/* Modal de détail produit avec zoom */}
      <ProductDetailModal
        product={selectedProduct}
        categories={categoriesData}
        onClose={closeProductDetail}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        favorites={favorites}
        isOpen={productDetailOpen}
      />

      {/* Modal du panier */}
      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        cartItemsCount={cartItemsCount}
      />

      {/* Aide pour l'accès admin */}
      <AdminHelp />

      {/* Footer */}
      <Footer 
        onOpenQuiSommesNous={() => setQuiSommesNousOpen(true)}
        onOpenCGV={() => setCgvOpen(true)}
        onOpenAProposBijoux={() => setAproposBijouxOpen(true)}
      />

      {/* Pages modales du footer */}
      {quiSommesNousOpen && (
        <QuiSommesNous onClose={() => setQuiSommesNousOpen(false)} />
      )}
      
      {cgvOpen && (
        <CGV onClose={() => setCgvOpen(false)} />
      )}
      
      {aproposBijouxOpen && (
        <AProposBijoux onClose={() => setAproposBijouxOpen(false)} />
      )}
    </div>
  )
}

export default App
