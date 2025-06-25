
import React from 'react';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from './button';

interface SocialLinksProps {
  variant?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ 
  variant = 'horizontal', 
  size = 'md',
  showLabels = false 
}) => {
  const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6';
  const containerClass = variant === 'horizontal' ? 'flex items-center gap-4' : 'flex flex-col gap-3';
  
  // Map our size prop to Button's valid size values
  const buttonSize = size === 'md' ? 'default' : size;

  return (
    <div className={containerClass}>
      <Button
        variant="ghost"
        size={buttonSize}
        className="text-luxury-600 hover:text-luxury-700 hover:bg-luxury-100"
        onClick={() => window.open('https://www.instagram.com/aaroham_?igsh=OXFjd3V2eHdlOXhj', '_blank')}
      >
        <Instagram className={iconSize} />
        {showLabels && <span className="ml-2">Instagram</span>}
      </Button>
      
      <Button
        variant="ghost"
        size={buttonSize}
        className="text-luxury-600 hover:text-luxury-700 hover:bg-luxury-100"
        onClick={() => window.open('https://www.linkedin.com/groups/14719662/', '_blank')}
      >
        <Linkedin className={iconSize} />
        {showLabels && <span className="ml-2">LinkedIn</span>}
      </Button>
      
      <Button
        variant="ghost"
        size={buttonSize}
        className="text-luxury-600 hover:text-luxury-700 hover:bg-luxury-100"
        onClick={() => window.open('mailto:aaroham.net@gmail.com')}
      >
        <Mail className={iconSize} />
        {showLabels && <span className="ml-2">Email</span>}
      </Button>
      
      <Button
        variant="ghost"
        size={buttonSize}
        className="text-luxury-600 hover:text-luxury-700 hover:bg-luxury-100"
        onClick={() => window.open('tel:+919176988931')}
      >
        <Phone className={iconSize} />
        {showLabels && <span className="ml-2">Call</span>}
      </Button>
    </div>
  );
};
