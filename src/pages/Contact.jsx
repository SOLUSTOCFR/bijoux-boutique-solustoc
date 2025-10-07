import React, { useState } from 'react'
import { X, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const Contact = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    name: '',
    subject: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/mrbyzegw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ email: '', message: '', name: '', subject: '' })
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-modal-overlay fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="contact-modal-content bg-white rounded-lg shadow-xl max-w-4xl w-full h-full sm:h-auto sm:max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">Contactez-nous</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row h-full sm:max-h-[calc(95vh-100px)]">
          {/* Informations de contact */}
          <div className="lg:w-1/3 bg-gradient-to-br from-amber-500 to-yellow-600 text-white p-6 lg:p-8">
            <h3 className="text-xl font-bold mb-6">Nos Coordonnées</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-amber-100">contact@solustoc.fr</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Téléphone</h4>
                  <p className="text-amber-100">01 23 45 67 89</p>
                  <p className="text-sm text-amber-200">Lun-Ven 9h-18h</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Adresse</h4>
                  <p className="text-amber-100">
                    123 Rue des Bijoutiers<br />
                    75001 Paris, France
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <h4 className="font-medium mb-2">Horaires d'ouverture</h4>
              <div className="text-sm text-amber-100 space-y-1">
                <p>Lundi - Vendredi : 9h - 18h</p>
                <p>Samedi : 10h - 17h</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:w-2/3 p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                <p className="text-gray-600 mb-6">
                  Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                </p>
                <Button onClick={onClose} className="bg-amber-500 hover:bg-amber-600">
                  Fermer
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Envoyez-nous un message</h3>
                <p className="text-gray-600 mb-6">
                  Une question sur nos bijoux ? Un problème avec votre commande ? 
                  N'hésitez pas à nous contacter !
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                        placeholder="Votre nom et prénom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      * Champs obligatoires
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-amber-500 hover:bg-amber-600 px-6 py-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Envoi...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2">💡 Conseil</h4>
                  <p className="text-sm text-amber-700">
                    Pour un traitement plus rapide, n'hésitez pas à mentionner votre numéro de commande 
                    si votre demande concerne un achat.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
