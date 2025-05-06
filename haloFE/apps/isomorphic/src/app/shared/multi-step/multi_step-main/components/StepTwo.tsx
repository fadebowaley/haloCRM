import React, { useState } from 'react';  // Import useState for tracking selected card
import useFetchTemplates from '../hooks/useFetchTemplates';  // Import the hook
import { IndustryTemplate } from '../utils/types';

// Import icons from the specified location
import ApartmentIcon from '@core/components/icons/apartment';
import DeliveryTruckIcon from '@core/components/icons/delivery-truck';
import RealEstateIcon from '@core/components/icons/real-estate';
import ShoppingBagSolidIcon from '@core/components/icons/shopping-bag-solid';
import RetailIcon from '@core/components/icons/retail';
import FranchiseIcon from '@core/components/icons/franchise';
import ChurchIcon from '@core/components/icons/church';

export interface StepTwoProps {
  onSelect: (industry: IndustryTemplate) => void;
  onContinue: () => void;  // Function to handle Continue (Next) button click
  onBack: () => void;  // Function to handle Back button click
}

export default function StepTwo({ onSelect, onContinue, onBack }: StepTwoProps) {
  const { industryTemplates, loading, error } = useFetchTemplates();  // Use the custom hook

  // Ensure industryTemplates is always an array to avoid the .map error
  const templates = Array.isArray(industryTemplates) ? industryTemplates : [];

  const isNextDisabled: boolean = Boolean(loading || error || templates.length === 0);

  // Track the selected industry for blue outline
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryTemplate | null>(null);

  // Function to map industries to icons
  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'Churches/Religious Organizations':
        return <ChurchIcon className="mr-4 text-3xl" />;
      case 'Logistics/Delivery Services':
        return <DeliveryTruckIcon className="mr-4 text-3xl" />;
      case 'Real Estate Chains':
        return <RealEstateIcon className="mr-4 text-3xl" />;
      case 'Retail Chains':
        return <RetailIcon className="mr-4 text-3xl" />;
      case 'Franchise Businesses':
        return <FranchiseIcon className="mr-4 text-3xl" />;
      case 'General Merchandise':
        return <ShoppingBagSolidIcon className="mr-4 text-3xl" />;
      default:
        return <ApartmentIcon className="mr-4 text-3xl" />;  // Default icon
    }
  };

  // Handle card selection
  const handleCardSelect = (template: IndustryTemplate) => {
    setSelectedIndustry(template);  // Set the selected industry
    onSelect(template);  // Pass the full template object to the onSelect function
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Select Your Industry
      </h2>
      <p className="text-gray-600 mb-8">
        Choose the industry that best matches your organization 
        to get pre-configured role templates.
      </p>
      
      {/* Show loading or error states, but always keep the buttons visible */}
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div 
            key={template.industry}
            onClick={() => handleCardSelect(template)}  // Pass the full template object
            className={`bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition-shadow p-6 px-8 flex items-center justify-between
              ${selectedIndustry?.industry === template.industry ? 'border-blue-500' : ''}  // Blue border when selected
            `}
          >
            {/* Render the correct icon based on the industry */}
            {getIndustryIcon(template.industry)}

            <h3 className="text-2xl font-semibold text-blue-700 flex-grow whitespace-normal">{template.industry}</h3>  {/* Allow text to wrap */}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Back
        </button>

        <button
          onClick={onContinue}
          disabled={isNextDisabled}
          className={`px-6 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
            isNextDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
