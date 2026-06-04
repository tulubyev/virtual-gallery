import React, { useState, useEffect } from 'react';
import { CustomizationOption, RoomCustomization } from '../../../models/Room';

interface RoomCustomizerProps {
  customizationOptions: CustomizationOption[];
  currentCustomizations: RoomCustomization[];
  onCustomizationChange: (customizations: RoomCustomization[]) => void;
}

export const RoomCustomizer: React.FC<RoomCustomizerProps> = ({
  customizationOptions,
  currentCustomizations,
  onCustomizationChange
}) => {
  const [customizations, setCustomizations] = useState<RoomCustomization[]>(currentCustomizations);

  useEffect(() => {
    setCustomizations(currentCustomizations);
  }, [currentCustomizations]);

  const handleCustomizationChange = (optionId: string, value: any) => {
    const updatedCustomizations = customizations.map(customization =>
      customization.optionId === optionId
        ? { ...customization, value }
        : customization
    );

    // If the option doesn't exist, add it
    if (!updatedCustomizations.find(c => c.optionId === optionId)) {
      updatedCustomizations.push({ optionId, value });
    }

    setCustomizations(updatedCustomizations);
    onCustomizationChange(updatedCustomizations);
  };

  const getCurrentValue = (optionId: string) => {
    const customization = customizations.find(c => c.optionId === optionId);
    return customization?.value;
  };

  const renderCustomizationControl = (option: CustomizationOption) => {
    const currentValue = getCurrentValue(option.id) || option.defaultValue;

    switch (option.type) {
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{option.name}:</span>
            <div className="flex space-x-1">
              {option.values.map((color: string) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    currentValue === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleCustomizationChange(option.id, color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        );

      case 'lighting':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">{option.name}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={currentValue}
              onChange={(e) => handleCustomizationChange(option.id, parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500">{currentValue}</div>
          </div>
        );

      case 'material':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">{option.name}</label>
            <select
              value={currentValue}
              onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {option.values.map((material: string) => (
                <option key={material} value={material}>
                  {material.charAt(0).toUpperCase() + material.slice(1)}
                </option>
              ))}
            </select>
          </div>
        );

      case 'decoration':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">{option.name}</label>
            <div className="grid grid-cols-2 gap-2">
              {option.values.map((decoration: string) => (
                <button
                  key={decoration}
                  className={`p-2 border rounded-md text-sm ${
                    currentValue === decoration
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleCustomizationChange(option.id, decoration)}
                >
                  {decoration.charAt(0).toUpperCase() + decoration.slice(1)}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">{option.name}</label>
            <input
              type="text"
              value={currentValue}
              onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        );
    }
  };

  if (customizationOptions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No customization options available for this room type.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Customize Room</h3>

      <div className="space-y-4">
        {customizationOptions.map((option) => (
          <div key={option.id} className="p-4 border border-gray-200 rounded-lg">
            {renderCustomizationControl(option)}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <button
          onClick={() => {
            const defaultCustomizations = customizationOptions.map(option => ({
              optionId: option.id,
              value: option.defaultValue
            }));
            setCustomizations(defaultCustomizations);
            onCustomizationChange(defaultCustomizations);
          }}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Reset to Defaults
        </button>

        <div className="text-sm text-gray-500">
          {customizations.length} customization{customizations.length !== 1 ? 's' : ''} applied
        </div>
      </div>
    </div>
  );
};

export default RoomCustomizer;import { CustomizationOption, RoomCustomization } from '../../../models/Room';

interface RoomCustomizerProps {
  customizationOptions: CustomizationOption[];
  currentCustomizations: RoomCustomization[];
  onCustomizationChange: (customizations: RoomCustomization[]) => void;
}

export const RoomCustomizer: React.FC<RoomCustomizerProps> = ({
  customizationOptions,
  currentCustomizations,
  onCustomizationChange
}) => {
  const [customizations, setCustomizations] = useState<RoomCustomization[]>(currentCustomizations);

  useEffect(() => {
    setCustomizations(currentCustomizations);
  }, [currentCustomizations]);

  const handleCustomizationChange = (optionId: string, value: any) => {
    const updatedCustomizations = customizations.map(customization =>
      customization.optionId === optionId
        ? { ...customization, value }
        : customization
    );

    // If the option doesn't exist, add it
    if (!updatedCustomizations.find(c => c.optionId === optionId)) {
      updatedCustomizations.push({ optionId, value });
    }

    setCustomizations(updatedCustomizations);
    onCustomizationChange(updatedCustomizations);
  };

  const getCurrentValue = (optionId: string) => {
    const customization = customizations.find(c => c.optionId === optionId);
    return customization?.value;
  };

  const renderCustomizationControl = (option: CustomizationOption) => {
    const currentValue = getCurrentValue(option.id) || option.defaultValue;

    switch (option.type) {
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{option.name}:</span>
            <div className="flex space-x-1">
              {option.values.map((color: string) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    currentValue === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleCustomizationChange(option.id, color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        );

      case 'lighting':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">{option.name}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={currentValue}
              onChange={(e) => handleCustomizationChange(option.id, parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500">{currentValue}</div>
          </div>
        );

      case 'material':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">{option.name}</label>
            <select
              value={currentValue}
              onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {option.values.map((material: string) => (
                <option key={material} value={material}>
                  {material.charAt(0).toUpperCase() + material.slice(1)}
                </option>
              ))}
            </select>
          </div>
        );

      case 'decoration':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">{option.name}</label>
            <div className="grid grid-cols-2 gap-2">
              {option.values.map((decoration: string) => (
                <button
                  key={decoration}
                  className={`p-2 border rounded-md text-sm ${
                    currentValue === decoration
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleCustomizationChange(option.id, decoration)}
                >
                  {decoration.charAt(0).toUpperCase() + decoration.slice(1)}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium">{option.name}</label>
            <input
              type="text"
              value={currentValue}
              onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        );
    }
  };

  if (customizationOptions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No customization options available for this room type.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Customize Room</h3>

      <div className="space-y-4">
        {customizationOptions.map((option) => (
          <div key={option.id} className="p-4 border border-gray-200 rounded-lg">
            {renderCustomizationControl(option)}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <button
          onClick={() => {
            const defaultCustomizations = customizationOptions.map(option => ({
              optionId: option.id,
              value: option.defaultValue
            }));
            setCustomizations(defaultCustomizations);
            onCustomizationChange(defaultCustomizations);
          }}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Reset to Defaults
        </button>

        <div className="text-sm text-gray-500">
          {customizations.length} customization{customizations.length !== 1 ? 's' : ''} applied
        </div>
      </div>
    </div>
  );
};

export default RoomCustomizer;
