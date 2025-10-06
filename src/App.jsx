import { useState, useMemo } from 'react'
import { ShoppingCart, Search, Star, Filter, Heart, Eye, Settings, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import './App.css'

// Import des données
import productsData from './data/products.json'
import categoriesData from './data/categories.json'

// Import des composants d'administration
import AdminPanel from './components/AdminPanel.jsx'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [products, setProducts] = useState(productsData)
  const [adminPanelOpen, setAdminPanelOpen] = useState(false)

  // Filtrage et tri des produits
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.pricePromo - b.pricePromo
        case 'price-desc':
          return b.pricePromo - a.pricePromo
        case 'stock':
          return b.stock - a.stock
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, searchTerm, selectedCategory, sortBy])

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

  const cartTotal = cart.reduce((sum, item) => sum + (item.pricePromo * item.quantity), 0)
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-amber-600">✨ Bijoux d'Or</div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                Promotions jusqu'à -75%
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAdminPanelOpen(true)}
                className="hidden md:flex"
              >
                <Settings className="w-4 h-4 mr-2" />
                Administration
              </Button>
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Panier
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
              <div className="text-sm font-medium text-gray-700">
                Total: {cartTotal.toFixed(2)}€
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Collection Bijoux Dorés</h1>
          <p className="text-xl mb-6">Découvrez notre sélection de bijoux dorés avec des promotions exceptionnelles</p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-red-500 text-white px-4 py-2 text-lg">
              Réduction moyenne -75%
            </Badge>
            <Badge className="bg-green-500 text-white px-4 py-2 text-lg">
              {products.length} produits disponibles
            </Badge>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un bijou..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categoriesData.map(category => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom A-Z</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="stock">Stock disponible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-2 border-transparent hover:border-amber-200">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Image placeholder avec gradient doré */}
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-yellow-200 flex items-center justify-center text-6xl">
                    💎
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.stock < 10 && (
                      <Badge className="bg-red-500 text-white text-xs">
                        Stock limité
                      </Badge>
                    )}
                    <Badge className="bg-green-500 text-white text-xs">
                      -{Math.round((1 - product.pricePromo / product.pricePublic) * 100)}%
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 bg-white/90"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart 
                        className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 bg-white/90"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs mb-2">
                      {categoriesData.find(cat => cat.slug === product.category)?.name || product.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-800">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-amber-600">
                        {product.pricePromo.toFixed(2)}€
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.pricePublic.toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">
                      Stock: {product.stock}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">✨ Bijoux d'Or</h3>
            <p className="text-gray-300 mb-4">
              Votre boutique en ligne de bijoux dorés avec les meilleures promotions
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-400">
              <span>📧 contact@bijoux-dor.fr</span>
              <span>📞 01 23 45 67 89</span>
              <span>🚚 Livraison gratuite dès 50€</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Panel d'administration */}
      <AdminPanel
        products={products}
        onProductUpdate={updateProduct}
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
      />
    </div>
  )
}

export default App
