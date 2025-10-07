import React from 'react';

const Footer = ({ onOpenQuiSommesNous, onOpenCGV, onOpenAProposBijoux, onOpenContact }) => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Informations légales */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Informations légales</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Solustoc</strong></p>
              <p>SAS, société par actions simplifiée</p>
              <p>SIRET : 943 702 126 00013</p>
              <p>TVA : FR79943702126</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 69 bis Rue du Bêle</p>
              <p>44300 Nantes</p>
              <p>📞 06 23 14 16 66</p>
              <p>📧 brice.ramis@solustoc.com</p>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Liens utiles</h3>
            <div className="space-y-2 text-sm">
              <button 
                onClick={onOpenContact}
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                📧 Nous contacter
              </button>
              <button 
                onClick={onOpenQuiSommesNous}
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                Qui sommes-nous ?
              </button>
              <button 
                onClick={onOpenCGV}
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                Conditions Générales de Vente
              </button>
              <button 
                onClick={onOpenAProposBijoux}
                className="block text-gray-300 hover:text-amber-400 transition-colors"
              >
                À Propos des Bijoux
              </button>
            </div>
          </div>

          {/* Garanties */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Nos garanties</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Environnement sécurisé</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Retours sous 7 jours</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Service client réactif</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                <span>Livraison gratuite dès 20€</span>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>© 2025 Solustoc - Tous droits réservés</p>
              <p className="mt-1">Vous achetez dans un environnement sécurisé, avec des garanties claires</p>
            </div>
            
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p className="font-semibold text-amber-400">Bijoux d'Or</p>
              <p>Collection Les Bijoux de Mimi</p>
              <p>Déstockage sélectif de créateurs</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
