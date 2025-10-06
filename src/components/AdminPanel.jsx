import { useState } from 'react'
import { Settings, Camera, Package, BarChart3, X, Edit, Eye, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import PhotoManager from './PhotoManager.jsx'

const AdminPanel = ({ products, onProductUpdate, isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [photoManagerOpen, setPhotoManagerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePhotosUpdate = (productId, photos) => {
    const updatedProduct = {
      ...products.find(p => p.id === productId),
      images: photos.map(photo => photo.url),
      image: photos[0]?.url || '/images/products/placeholder.jpg'
    }
    onProductUpdate(updatedProduct)
  }

  const openPhotoManager = (product) => {
    setSelectedProduct(product)
    setPhotoManagerOpen(true)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
        <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Administration - Gestion des Bijoux
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs defaultValue="products" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Produits ({products.length})
                </TabsTrigger>
                <TabsTrigger value="photos" className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Gestion Photos
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Statistiques
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder="Rechercher un produit..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-md"
                    />
                    <Badge variant="outline">
                      {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                    </Badge>
                  </div>

                  <div className="grid gap-4">
                    {filteredProducts.map(product => (
                      <Card key={product.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg flex items-center justify-center text-2xl">
                              💎
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate">{product.name}</h3>
                              <p className="text-sm text-gray-600">{product.category}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  Stock: {product.stock}
                                </Badge>
                                <Badge className="text-xs bg-green-100 text-green-800">
                                  {product.pricePromo}€
                                </Badge>
                                <Badge variant="outline" className="text-xs line-through">
                                  {product.pricePublic}€
                                </Badge>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openPhotoManager(product)}
                              >
                                <Camera className="w-4 h-4 mr-2" />
                                Photos
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-2" />
                                Modifier
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="photos" className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-12 h-12 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Gestion centralisée des photos</h3>
                    <p className="text-gray-600 mb-6">
                      Ajoutez et gérez les photos de vos bijoux pour améliorer leur présentation
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.slice(0, 12).map(product => (
                      <Card key={product.id} className="group hover:shadow-lg transition-all cursor-pointer" onClick={() => openPhotoManager(product)}>
                        <CardContent className="p-4">
                          <div className="aspect-square bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg flex items-center justify-center text-4xl mb-3">
                            💎
                          </div>
                          <h4 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h4>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {product.category}
                            </Badge>
                            <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Camera className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-3">📸 Guide pour les photos de bijoux</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                      <div>
                        <h5 className="font-medium mb-2">Éclairage optimal :</h5>
                        <ul className="space-y-1">
                          <li>• Lumière naturelle diffuse</li>
                          <li>• Éviter les reflets directs</li>
                          <li>• Utiliser un diffuseur si nécessaire</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Composition :</h5>
                        <ul className="space-y-1">
                          <li>• Fond neutre et propre</li>
                          <li>• Bijou centré et net</li>
                          <li>• Plusieurs angles de vue</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stats" className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-amber-600">{products.length}</div>
                      <div className="text-sm text-gray-600">Produits total</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {products.reduce((sum, p) => sum + p.stock, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Stock total</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {products.reduce((sum, p) => sum + (p.pricePublic * p.stock), 0).toLocaleString()}€
                      </div>
                      <div className="text-sm text-gray-600">Valeur stock</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(products.reduce((sum, p) => sum + ((p.pricePublic - p.pricePromo) / p.pricePublic * 100), 0) / products.length)}%
                      </div>
                      <div className="text-sm text-gray-600">Réduction moy.</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Produits par catégorie</h3>
                  {Object.entries(
                    products.reduce((acc, product) => {
                      acc[product.category] = (acc[product.category] || 0) + 1
                      return acc
                    }, {})
                  ).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{category}</span>
                      <Badge>{count} produit{count > 1 ? 's' : ''}</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <PhotoManager
        product={selectedProduct}
        onPhotosUpdate={handlePhotosUpdate}
        isOpen={photoManagerOpen}
        onClose={() => {
          setPhotoManagerOpen(false)
          setSelectedProduct(null)
        }}
      />
    </>
  )
}

export default AdminPanel
