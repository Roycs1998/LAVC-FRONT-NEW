// components/SocialWidget.tsx

import React from 'react';

import { Icon } from '@iconify/react';

interface SocialWidgetProps {
  
    /** WhatsApp phone number en formato internacional, e.g. +1234567890 */
  phoneNumber: string;
  
  /** Mensaje opcional que se precarga en la ventana de chat */
  message?: string;
}

const SocialWidget: React.FC<SocialWidgetProps> = ({ phoneNumber, message }) => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';
  const href = `https://wa.me/${cleanNumber}${encodedMessage}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <Icon icon="mdi:whatsapp" width="28" height="28" />
    </a>
  );
};

export default SocialWidget;
