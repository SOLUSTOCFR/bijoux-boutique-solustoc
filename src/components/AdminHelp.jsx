import { useState, useEffect } from 'react'
import { Info, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'

const AdminHelp = () => {
  const [showHelp, setShowHelp] = useState(false)

  // Pas d'affichage automatique, seulement sur demande

  const handleClose = () => {
    setShowHelp(false)
    localStorage.setItem('admin-help-seen', 'true')
  }

  if (!showHelp) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowHelp(true)}
        className="fixed bottom-4 right-4 z-40 bg-amber-100 hover:bg-amber-200 text-amber-800"
      >
        <Info className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-gray-900">Accès Administration</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Pour accéder à l'interface d'administration de votre boutique :
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✨ Bijoux d'<span className="bg-amber-200 px-1 rounded">Or</span></span>
              </div>
              <p className="text-sm text-amber-800">
                <strong>Cliquez 3 fois rapidement</strong> sur le mot "Or" dans le logo en haut à gauche
              </p>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Cliquez avec la souris, pas le clavier</p>
              <p>• Les 3 clics doivent être rapides (moins de 2 secondes)</p>
              <p>• L'interface d'administration s'ouvrira automatiquement</p>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleClose} className="bg-amber-500 hover:bg-amber-600">
              Compris !
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminHelp
