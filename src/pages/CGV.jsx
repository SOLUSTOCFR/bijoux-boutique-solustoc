import React from 'react';

const CGV = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Conditions Générales de Vente</h1>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700">
              Les présentes Conditions Générales de Vente (CGV) régissent les ventes réalisées par Solustoc 
              sur son site Solustoc.fr.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Objet</h3>
              <p className="text-gray-700">
                Les CGV définissent les droits et obligations entre Solustoc et ses clients.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Acceptation</h3>
              <p className="text-gray-700">
                Toute commande implique l'acceptation sans réserve des présentes CGV.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Produits</h3>
              <p className="text-gray-700">
                Les descriptions sont fournies à titre indicatif ; de légères variations peuvent survenir.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Prix & Paiement</h3>
              <p className="text-gray-700">
                Les prix sont en euros TTC, hors livraison. Paiement à la commande.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">5. Livraison</h3>
              <p className="text-gray-700">
                Délai indicatif, hors force majeure. Le client doit signaler toute anomalie sous 48h.
                <br />
                <strong className="text-green-600">Livraison gratuite à partir de 20€ d'achat.</strong>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">6. Droit de rétractation</h3>
            <p className="text-gray-700">
              Conformément à l'article L.221-18 du Code de la consommation, le client dispose de 7 jours 
              pour se rétracter. Les produits doivent être retournés dans leur état d'origine, non portés, 
              dans l'emballage d'origine.
            </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">7. Garantie</h3>
              <p className="text-gray-700">
                Conformité assurée (articles L.217-4 et suivants). Remboursement ou échange possible.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">8. Réclamations</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Contact :</strong><br />
                  📍 69 bis Rue du Bêle, 44300 Nantes<br />
                  📞 06 23 14 16 66<br />
                  📧 brice.ramis@solustoc.com
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">9. Données personnelles</h3>
              <p className="text-gray-700">
                Traitement conforme RGPD. Droit d'accès, rectification, suppression.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">10. Loi applicable</h3>
              <p className="text-gray-700">
                Droit français. Médiation disponible avant tout recours judiciaire.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Informations légales</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>SIREN :</strong> 943 702 126</p>
              <p><strong>SIRET :</strong> 943 702 126 00013</p>
              <p><strong>TVA :</strong> FR79943702126</p>
              <p><strong>Forme juridique :</strong> SAS, société par actions simplifiée</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGV;
