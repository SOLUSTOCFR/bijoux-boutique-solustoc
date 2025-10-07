import React from 'react';

const AProposBijoux = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">À Propos des Bijoux de Mimi</h1>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-4">Les Bijoux de Mimi</h2>
            <p className="text-lg text-gray-600">Un univers coloré, expressif et raffiné</p>
          </div>

          <div className="bg-pink-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">L'histoire de la marque</h3>
            <p className="text-gray-700 leading-relaxed">
              Les Bijoux de Mimi incarnent un univers coloré, expressif et raffiné. Créée initialement par 
              Amelia Hitchcock Merritt, la marque célèbre la joie, l'identité et la féminité. Ses créations 
              associent couleurs vibrantes, détails fins et finitions soignées — pour un bijou à la fois 
              accessible et luxueux.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Nos valeurs</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-xl">🎨</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Couleur et personnalité</h4>
                  <p className="text-gray-700">Chaque pièce est un accent de style unique.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-xl">💎</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Qualité</h4>
                  <p className="text-gray-700">Finitions dorées, matériaux hypoallergéniques, contrôle qualité rigoureux.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-xl">🔄</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Modularité</h4>
                  <p className="text-gray-700">Cordons réglables, médailles gravées, éléments interchangeables.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-purple-600 mr-3 text-xl">👥</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Communauté</h4>
                  <p className="text-gray-700">Relation directe avec les clientes, pop-ups, feedback continu.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Pourquoi choisir Mimi avec Solustoc ?</h3>
            <p className="text-gray-700 leading-relaxed">
              Solustoc propose des bijoux de la marque Mimi à des prix très compétitifs, tout en garantissant 
              authenticité, service client de qualité, et un luxe accessible à toutes.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Nos garanties</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Matériaux hypoallergéniques</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Finitions dorées de qualité</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Contrôle qualité rigoureux</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Authenticité garantie</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Service client personnalisé</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">Retours sous 7 jours</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Environnement sécurisé</h3>
            <p className="text-gray-700 leading-relaxed">
              Vous achetez dans un environnement sécurisé, avec des garanties claires : retours facilités, 
              service client réactif, et transparence totale sur nos produits et services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AProposBijoux;
