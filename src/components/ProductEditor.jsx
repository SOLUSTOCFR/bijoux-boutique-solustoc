import { useState } from 'react'
import { Save, X, Package, DollarSign, Hash, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'

const ProductEditor = ({ product, categories, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    stock: product?.stock || 0,
    pricePublic: product?.pricePublic || 0,
    pricePromo: product?.pricePromo || 0,
    description: product?.description || ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du produit est requis'
    }
    
    if (!formData.category) {
      newErrors.category = 'La catégorie est requise'
    }
    
    if (formData.stock < 0) {
      newErrors.stock = 'Le stock ne peut pas être négatif'
    }
    
    if (formData.pricePublic <= 0) {
      newErrors.pricePublic = 'Le prix public doit être supérieur à 0'
    }
    
    if (formData.pricePromo <= 0) {
      newErrors.pricePromo = 'Le prix promo doit être supérieur à 0'
    }
    
    if (formData.pricePromo >= formData.pricePublic) {
      newErrors.pricePromo = 'Le prix promo doit être inférieur au prix public'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      const updatedProduct = {
        ...product,
        ...formData,
        stock: parseInt(formData.stock),
        pricePublic: parseFloat(formData.pricePublic),
        pricePromo: parseFloat(formData.pricePromo)
      }
      onSave(updatedProduct)
    }
  }

  const discountPercentage = formData.pricePublic > 0 
    ? Math.round((1 - formData.pricePromo / formData.pricePublic) * 100)
    : 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {product ? 'Modifier le produit' : 'Nouveau produit'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Nom du produit */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ex: BAGUE ANNEAU LARGE LBDM DORE"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Catégorie */}
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label htmlFor="stock">Stock disponible</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleChange('stock', e.target.value)}
                  className={`pl-10 ${errors.stock ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.stock && (
                <p className="text-sm text-red-500">{errors.stock}</p>
              )}
            </div>

            {/* Prix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricePublic">Prix public (€) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="pricePublic"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.pricePublic}
                    onChange={(e) => handleChange('pricePublic', e.target.value)}
                    className={`pl-10 ${errors.pricePublic ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.pricePublic && (
                  <p className="text-sm text-red-500">{errors.pricePublic}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePromo">Prix promotionnel (€) *</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="pricePromo"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.pricePromo}
                    onChange={(e) => handleChange('pricePromo', e.target.value)}
                    className={`pl-10 ${errors.pricePromo ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.pricePromo && (
                  <p className="text-sm text-red-500">{errors.pricePromo}</p>
                )}
              </div>
            </div>

            {/* Aperçu de la réduction */}
            {formData.pricePublic > 0 && formData.pricePromo > 0 && formData.pricePromo < formData.pricePublic && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-800 font-medium">
                    Réduction: -{discountPercentage}%
                  </span>
                  <span className="text-green-600">
                    Économie: {(formData.pricePublic - formData.pricePromo).toFixed(2)}€
                  </span>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnel)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Description détaillée du bijou..."
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onCancel}>
                Annuler
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-amber-500 hover:bg-amber-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductEditor
