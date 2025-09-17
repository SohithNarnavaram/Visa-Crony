import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface VisaTileProps {
  country: {
    name: string;
    visaType: string;
    processingDays: string;
    visaFees: string;
    serviceFees: string;
    description: string;
  };
  onClick: () => void;
  index: number;
}

const VisaTile: React.FC<VisaTileProps> = ({ country, onClick, index }) => {
  return (
    <div 
      className="relative h-full cursor-pointer group animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
    >
      {/* Main Card Container */}
      <div className="relative h-full bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105 flex flex-col">
        
        {/* Top Section - Blurred */}
        <div className="relative h-32 bg-gradient-to-br from-muted/20 to-muted/40 backdrop-blur-sm overflow-hidden">
          {/* Country Background Image */}
          {(() => {
            const countryImageName = country.name.toLowerCase().replace(/\s+/g, '-');
            const imagePath = `/country-images/${countryImageName}.jpg`;
            
            // Special positioning for specific countries
            const getBackgroundPosition = (countryName: string) => {
              switch (countryName.toLowerCase()) {
                case 'singapore':
                  return 'center 30%';
                case 'greece':
                  return 'center 40%';
                case 'switzerland':
                  return 'center 35%';
                case 'germany':
                  return 'center 25%';
                case 'italy':
                  return 'center 35%';
                case 'poland':
                  return 'center 30%';
                case 'dubai':
                  return 'center 25%';
                case 'russia':
                  return 'center 30%';
                case 'azerbaijan':
                  return 'center 35%';
                case 'philippines':
                  return 'center 40%';
                case 'sri lanka':
                  return 'center 35%';
                case 'indonesia':
                  return 'center 40%';
                case 'cambodia':
                  return 'center 30%';
                case 'georgia':
                  return 'center 35%';
                case 'south korea':
                  return 'center 30%';
                case 'turkey':
                  return 'center 35%';
                case 'uganda':
                  return 'center 40%';
                case 'bahrain':
                  return 'center 30%';
                case 'armenia':
                  return 'center 35%';
                case 'hong kong':
                  return 'center 25%';
                case 'thailand':
                  return 'center 40%';
                case 'malaysia':
                  return 'center 35%';
                case 'new zealand':
                  return 'center 30%';
                case 'united states of america':
                  return 'center 25%';
                case 'united kingdom':
                  return 'center 30%';
                case 'canada':
                  return 'center 30%';
                case 'japan':
                  return 'center 35%';
                case 'south africa':
                  return 'center 40%';
                case 'france':
                  return 'center 30%';
                case 'denmark':
                  return 'center 35%';
                case 'slovakia':
                  return 'center 35%';
                case 'slovenia':
                  return 'center 35%';
                case 'austria':
                  return 'center 35%';
                case 'czech republic':
                  return 'center 35%';
                case 'hungary':
                  return 'center 35%';
                case 'iceland':
                  return 'center 40%';
                case 'bulgaria':
                  return 'center 35%';
                case 'spain':
                  return 'center 30%';
                case 'norway':
                  return 'center 40%';
                case 'finland':
                  return 'center 40%';
                case 'portugal':
                  return 'center 30%';
                default:
                  return 'center';
              }
            };

                return (
                  <div
                    className="absolute inset-0 bg-cover bg-no-repeat opacity-85"
                    style={{
                      backgroundImage: `url(${imagePath})`,
                      backgroundPosition: getBackgroundPosition(country.name),
                      filter: 'brightness(1.2)'
                    }}
                  />
                );
          })()}
          
          {/* Background Pattern/Image Area */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 opacity-50"></div>
          
          {/* Country Name and Badge */}
          <div className="relative z-10 p-4 h-full flex flex-col justify-between">
             <div>
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
                    {country.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="mt-2 w-fit border-black text-black dark:border-white dark:text-white group-hover:border-black group-hover:text-black dark:group-hover:border-white dark:group-hover:text-white transition-all duration-200"
                  >
                    {country.visaType}
                  </Badge>
             </div>
          </div>
          
          {/* Curved Divider - Enhanced transition blur */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-transparent via-background/40 to-background/90"></div>
        </div>

        {/* Bottom Section - Sharp */}
        <div className="p-4 space-y-3 bg-background flex flex-col flex-grow">
          {/* Processing Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent transition-colors duration-200 group-hover:text-secondary" />
            <span className="text-sm font-medium">{country.processingDays}</span>
          </div>
          
          {/* Cost Information */}
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-accent transition-colors duration-200 group-hover:text-secondary" />
            <span className="text-sm">
              Visa: {country.visaFees} + Service: {country.serviceFees}
            </span>
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
            {country.description}
          </p>
          
          {/* Action Button */}
          <Button 
            size="sm" 
            className="w-full mt-auto hover-scale transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Start Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisaTile;
