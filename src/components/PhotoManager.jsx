import { useState, useRef } from 'react'
import { Upload, X, Eye, Plus, Image as ImageIcon, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import PhotoUploadNote from './PhotoUploadNote.jsx'

const PhotoManager = ({ product, onPhotosUpdate, isOpen, onClose }) => {
  const [photos, setPhotos] = useState(product?.images || [])
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files)
    
    fileArray.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            url: e.target.result,
            name: file.name,
            size: file.size,
            type: file.type
          }
          setPhotos(prev => [...prev, newPhoto])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    handleFileSelect(files)
  }

  const removePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId))
  }

  const setMainPhoto = (photoId) => {
    setPhotos(prev => {
      const newPhotos = [...prev]
      const photoIndex = newPhotos.findIndex(p => p.id === photoId)
      if (photoIndex > 0) {
        const [photo] = newPhotos.splice(photoIndex, 1)
        newPhotos.unshift(photo)
      }
      return newPhotos
    })
  }

  const savePhotos = () => {
    onPhotosUpdate(product.id, photos)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Gestion des photos - {product?.name}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Note explicative */}
          <PhotoUploadNote />
          
          {/* Zone de téléchargement */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver 
                ? 'border-amber-400 bg-amber-50' 
                : 'border-gray-300 hover:border-amber-400'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Glissez vos photos ici ou cliquez pour sélectionner
                </h3>
                <p className="text-gray-600 mb-4">
                  Formats supportés: JPG, PNG, WEBP (max 5MB par image)
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-amber-500 hover:bg-amber-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Sélectionner des photos
                </Button>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* Galerie des photos */}
          {photos.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Photos du produit ({photos.length})
                </h3>
                <Badge variant="outline">
                  La première photo sera l'image principale
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={photo.id} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-amber-400 transition-colors">
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {index === 0 && (
                        <Badge className="bg-green-500 text-white text-xs">
                          Principal
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 p-0 bg-white/90"
                        onClick={() => removePhoto(photo.id)}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                      {index > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0 bg-white/90"
                          onClick={() => setMainPhoto(photo.id)}
                          title="Définir comme photo principale"
                        >
                          <Eye className="w-4 h-4 text-blue-500" />
                        </Button>
                      )}
                    </div>

                    {/* Informations */}
                    <div className="mt-2 text-xs text-gray-600 truncate">
                      {photo.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Conseils pour de belles photos</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Utilisez un éclairage naturel ou une lumière douce</li>
              <li>• Photographiez sur un fond neutre (blanc ou coloré uni)</li>
              <li>• Prenez plusieurs angles : face, profil, détails</li>
              <li>• Assurez-vous que le bijou soit net et bien visible</li>
              <li>• La première photo sera celle affichée dans le catalogue</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              onClick={savePhotos}
              className="bg-amber-500 hover:bg-amber-600"
              disabled={photos.length === 0}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Enregistrer les photos ({photos.length})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PhotoManager
