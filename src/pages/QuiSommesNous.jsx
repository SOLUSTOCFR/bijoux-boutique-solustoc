import React from 'react';

const QuiSommesNous = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Qui sommes-nous ?</h1>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-600 mb-4">Solustoc</h2>
            <p className="text-lg text-gray-600">Votre partenaire d'exception dans le domaine du déstockage sélectif</p>
          </div>

          <div className="bg-amber-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Notre identité</h3>
            <p className="text-gray-700 leading-relaxed">
              Fondée en avril 2025, Solustoc a pour ambition de redéfinir la distribution de produits de créateurs, 
              en alliant exigence qualitative, singularité et accessibilité.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Notre vision</h3>
            <p className="text-gray-700 leading-relaxed">
              Chez Solustoc, nous croyons que le luxe ne réside pas seulement dans le prix, mais dans le détail, 
              dans l'histoire et dans l'émotion que suscite un objet. Nous nous engageons à dénicher des pièces 
              d'exception, souvent issues de créateurs français, puis à les proposer à des tarifs défiant toute 
              concurrence.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Nos engagements</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Authenticité et traçabilité
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Transparence sur les origines et matériaux
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Responsabilité écologique
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                Accompagnement client personnalisé
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Informations légales</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>SIREN :</strong> 943 702 126</p>
              <p><strong>SIRET :</strong> 943 702 126 00013</p>
              <p><strong>TVA :</strong> FR79943702126</p>
              <p><strong>Forme juridique :</strong> SAS, société par actions simplifiée</p>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              <strong>Siège social :</strong> 69 bis Rue du Bêle, 44300 Nantes
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Contact :</strong> 📞 06 23 14 16 66 — 📧 brice.ramis@solustoc.com
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Site web :</strong> www.solustoc.fr
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuiSommesNous;
