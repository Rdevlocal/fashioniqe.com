import React, { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("q") || ""
  );

  const handleSearch = useCallback(() => {
    // Trim whitespace and ignore empty searches
    const trimmedTerm = searchTerm.trim();
    
    if (trimmedTerm) {
      // Encode the search term to handle special characters
      const encodedTerm = encodeURIComponent(trimmedTerm);
      router.push(`/search?q=${encodedTerm}`);
    } else {
      // If search is empty, go to default search page
      router.push("/search");
    }
  }, [searchTerm, router]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full border border-[#2E2E2E] rounded-md overflow-hidden">
      <span className="h-[40px] w-[40px] px-3 flex items-center justify-center">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
      <input
        placeholder="Zoek producten..."
        aria-label="Zoeken"
        className="w-full h-[40px] px-3 bg-[#0A0A0A] text-sm focus:outline-none"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button 
        onClick={handleSearch}
        className="px-4 bg-[#0A0A0A] hover:bg-[#1F1F1F] transition-colors"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
};

export default SearchInput;