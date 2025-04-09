'use client';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

import { Company, store$, getRandomCompany } from '@/lib/store';
import { use$ } from '@legendapp/state/react';
import { Pencil } from 'lucide-react';

export default function CompanyDisplay() {
  const company = use$<Company>(store$.company);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(company.companyName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (company.companyName === '') {
      store$.setCompany(getRandomCompany());
    }
  }, []);

  const handleSubmit = () => {
    if (inputValue.trim() !== company.companyName) {
      store$.setCompany(inputValue);
    }
    setIsEditing(false);
  };

  return (
    <div className="py-16 flex justify-center">
      <div className="relative flex items-center">
        {!isEditing ? (
          <div className="flex items-end space-x-4">
            <div>
              <span className="block text-muted-foreground text-lg mb-2">
                analyzing
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary transition-all duration-300">
                {company.companyName || '...'}
              </h2>
            </div>
            <button
              onClick={() => {
                setInputValue(company.companyName);
                setIsEditing(true);
              }}
              className="mb-3 h-10 w-10 rounded-full bg-accent flex items-center justify-center border border-border hover:bg-muted transition-all duration-200"
              aria-label="Edit company"
            >
              <Pencil size={16} className="text-primary" />
            </button>
          </div>
        ) : (
          <div className="animate-fadeIn flex items-end space-x-4">
            <div>
              <span className="block text-muted-foreground text-lg mb-2">
                analyzing
              </span>
              <div className="flex items-center">
                <Input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={handleSubmit}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="text-5xl md:text-6xl lg:text-7xl bg-transparent border-0 border-b-2 border-primary/30 shadow-none px-0 py-0 h-auto rounded-none focus-visible:ring-0 focus-visible:border-primary text-primary font-bold leading-tight"
                  placeholder="Enter company name..."
                />
              </div>
              <span className="block text-muted-foreground text-lg mb-2">
                Press Enter to Save
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="mb-3 h-10 w-10 rounded-full bg-accent flex items-center justify-center border border-border hover:bg-muted transition-all duration-200"
              aria-label="Save company"
            >
              <Pencil size={16} className="text-primary" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
