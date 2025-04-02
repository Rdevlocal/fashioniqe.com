// src/components/category/FilterSidebar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FilterSidebarProps {
  gender: string;
  categoryName: string;
  activeFilters: {
    color?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

// Available colors with their hex codes
const availableColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Purple", hex: "#800080" },
  { name: "Grey", hex: "#808080" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Pink", hex: "#FFC0CB" },
];

// Available sizes
const availableSizes = [
  "XS", "S", "M", "L", "XL", "XXL",
  "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"
];

// Price ranges
const priceRanges = [
  { label: "Under €50", min: 0, max: 50 },
  { label: "€50 - €100", min: 50, max: 100 },
  { label: "€100 - €150", min: 100, max: 150 },
  { label: "€150 - €200", min: 150, max: 200 },
  { label: "Over €200", min: 200, max: null },
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  gender, 
  categoryName, 
  activeFilters 
}) => {
  const router = useRouter();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    color: activeFilters.color || "",
    size: activeFilters.size || "",
    minPrice: activeFilters.minPrice || 0,
    maxPrice: activeFilters.maxPrice || 0
  });
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [customPrice, setCustomPrice] = useState({
    min: activeFilters.minPrice || "",
    max: activeFilters.maxPrice || ""
  });
  
  // Handle filter change and apply filters
  const handleFilterChange = (filterType: string, value: string) => {
    const updatedFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };
  
  // Handle price range change
  const handlePriceRangeSelect = (min: number, max: number | null) => {
    const updatedFilters = { 
      ...selectedFilters, 
      minPrice: min, 
      maxPrice: max !== null ? max : 1000000 // Use a very high number if max is null
    };
    setSelectedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };
  
  // Handle custom price input
  const handleCustomPriceChange = (type: 'min' | 'max', value: string) => {
    const newCustomPrice = { ...customPrice, [type]: value };
    setCustomPrice(newCustomPrice);
  };
  
  // Apply custom price filter
  const applyCustomPrice = () => {
    const min = customPrice.min === "" ? 0 : parseInt(customPrice.min as string);
    const max = customPrice.max === "" ? 1000000 : parseInt(customPrice.max as string);
    
    const updatedFilters = { 
      ...selectedFilters, 
      minPrice: min, 
      maxPrice: max 
    };
    setSelectedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };
  
  // Apply filters to URL
  const applyFilters = (filters: any) => {
    // Create URL with filters
    const url = new URL(`/${gender}/${categoryName}`, window.location.origin);
    
    // Add filters to URL
    if (filters.color) url.searchParams.set('color', filters.color);
    if (filters.size) url.searchParams.set('size', filters.size);
    if (filters.minPrice > 0) url.searchParams.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice > 0 && filters.maxPrice < 1000000) url.searchParams.set('maxPrice', filters.maxPrice.toString());
    
    // Reset to page 1 when filters change
    url.searchParams.set('page', '1');
    
    // Preserve sort parameter if it exists
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.has('sort')) {
      url.searchParams.set('sort', currentUrl.searchParams.get('sort')!);
    }
    
    // Navigate to the filtered URL
    router.push(url.pathname + url.search);
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({
      color: "",
      size: "",
      minPrice: 0,
      maxPrice: 0
    });
    
    setCustomPrice({
      min: "",
      max: ""
    });
    
    router.push(`/${gender}/${categoryName}`);
  };
  
  // Check if any filter is active
  const hasActiveFilters = () => {
    return (
      selectedFilters.color !== "" || 
      selectedFilters.size !== "" || 
      selectedFilters.minPrice > 0 || 
      selectedFilters.maxPrice > 0
    );
  };
  
  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-6">
        <button
          className="w-full flex items-center justify-between px-4 py-3 bg-[#0F0F0F] border border-gray-700 rounded"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <span className="font-medium">Filters</span>
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            fill="none"
            className={`transition-transform ${isMobileFiltersOpen ? 'rotate-180' : ''}`}
          >
            <path 
              d="M2 4L6 8L10 4" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      
      {/* Filter sidebar */}
      <div 
        className={`
          ${isMobileFiltersOpen ? 'block' : 'hidden'} 
          lg:block w-full lg:w-64 shrink-0
        `}
      >
        <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-5 sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Filters</h2>
            {hasActiveFilters() && (
              <button 
                className="text-sm text-blue-400 hover:text-blue-300"
                onClick={clearAllFilters}
              >
                Clear all
              </button>
            )}
          </div>
          
          {/* Color filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {availableColors.map(color => (
                <button
                  key={color.name}
                  className={`
                    w-7 h-7 rounded-full border-2 
                    ${selectedFilters.color === color.name 
                      ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' 
                      : 'border-gray-700'
                    }
                  `}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Filter by color: ${color.name}`}
                  onClick={() => handleFilterChange('color', 
                    selectedFilters.color === color.name ? '' : color.name
                  )}
                />
              ))}
            </div>
            {selectedFilters.color && (
              <div className="mt-2 text-sm">
                Selected: <span className="text-blue-400">{selectedFilters.color}</span>
              </div>
            )}
          </div>
          
          {/* Size filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map(size => (
                <button
                  key={size}
                  className={`
                    min-w-[40px] h-8 px-2 rounded border 
                    ${selectedFilters.size === size 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'border-gray-700 hover:border-gray-500'
                    }
                  `}
                  onClick={() => handleFilterChange('size', 
                    selectedFilters.size === size ? '' : size
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Price filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Price</h3>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  className={`
                    block w-full text-left px-3 py-2 rounded text-sm
                    ${(selectedFilters.minPrice === range.min && 
                      (selectedFilters.maxPrice === range.max || 
                       (range.max === null && selectedFilters.maxPrice > 200))) 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-[#1F1F1F]'
                    }
                  `}
                  onClick={() => handlePriceRangeSelect(range.min, range.max)}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            {/* Custom price range */}
            <div className="mt-4">
              <div className="text-sm mb-2">Custom range</div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full pl-7 pr-2 py-1.5 bg-[#0F0F0F] border border-gray-700 rounded text-sm"
                    value={customPrice.min}
                    onChange={(e) => handleCustomPriceChange('min', e.target.value)}
                  />
                </div>
                <span>-</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full pl-7 pr-2 py-1.5 bg-[#0F0F0F] border border-gray-700 rounded text-sm"
                    value={customPrice.max}
                    onChange={(e) => handleCustomPriceChange('max', e.target.value)}
                  />
                </div>
              </div>
              <button
                className="w-full mt-2 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                onClick={applyCustomPrice}
              >
                Apply
              </button>
            </div>
          </div>
          
          {/* Display active filters */}
          {hasActiveFilters() && (
            <div className="mt-6 pt-4 border-t border-gray-800">
              <h3 className="text-sm font-medium mb-2">Active Filters</h3>
              <ul className="space-y-1">
                {selectedFilters.color && (
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-400">Color:</span>
                    <span>{selectedFilters.color}</span>
                  </li>
                )}
                {selectedFilters.size && (
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-400">Size:</span>
                    <span>{selectedFilters.size}</span>
                  </li>
                )}
                {(selectedFilters.minPrice > 0 || selectedFilters.maxPrice > 0) && (
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-400">Price:</span>
                    <span>
                      {selectedFilters.minPrice > 0 ? `€${selectedFilters.minPrice}` : '€0'} 
                      {' - '} 
                      {selectedFilters.maxPrice < 1000000 ? `€${selectedFilters.maxPrice}` : '∞'}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;