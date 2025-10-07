import { Info, Upload, Cloud } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const PhotoUploadNote = () => {
  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Info className="w-4 h-4 text-orange-600" />
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">
                📸 Gestion des photos - Information importante
              </h4>
              <p className="text-sm text-orange-700">
                Actuellement, les photos sont stockées temporairement dans votre navigateur. 
                Pour une solution permanente avec stockage cloud, il faudrait développer une API backend.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Fonctionnement actuel :</span>
                </div>
                <ul className="text-orange-700 space-y-1 ml-6">
                  <li>• Photos stockées dans le navigateur</li>
                  <li>• Affichage immédiat sur la boutique</li>
                  <li>• Perdues si on vide le cache</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Solution permanente :</span>
                </div>
                <ul className="text-orange-700 space-y-1 ml-6">
                  <li>• API backend avec manus-upload-file</li>
                  <li>• Stockage cloud permanent</li>
                  <li>• URLs publiques stables</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-2 border-t border-orange-200">
              <Badge variant="outline" className="text-orange-700 border-orange-300">
                Version actuelle : Démo fonctionnelle
              </Badge>
              <Badge className="bg-orange-200 text-orange-800">
                Prochaine étape : Intégration backend
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PhotoUploadNote
