'use client';
import { Company, store$, type CompanyOverview } from '@/lib/store';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { companyOverviewSchema } from '@/app/api/ai/overview/route';

import { useState } from 'react';
import { Button } from './ui/button';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { use$ } from '@legendapp/state/react';

interface Tool {
  name: string;
  description: string;
  component: React.ComponentType;
}

const tools: Tool[] = [
  {
    name: 'company 101',
    description: 'find out what a company does',
    component: Company101Tool,
  },
];

export function ToolsPicker() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto pb-8">
      {tools.map((tool) => (
        <div
          key={tool.name}
          className="border border-border hover:cursor-pointer p-4 sm:p-6 rounded-lg bg-card hover:bg-muted transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-lg hover:translate-y-[-2px] min-h-[200px] sm:min-h-[220px] md:min-h-[240px]"
        >
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-card-foreground">
              {tool.name}
            </h2>
            <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-muted-foreground">
              {tool.description}
            </p>
          </div>
          <div className="mt-3 sm:mt-4">
            {React.createElement(tool.component)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Company101Tool() {
  const company = use$<Company>(store$.company);
  const [open, setOpen] = useState(false);

  const { object, submit, isLoading } = useObject({
    api: '/api/ai/overview',
    schema: companyOverviewSchema,
    onFinish: (result) => {
      store$.setCompanyOverview({
        foundingYear: result.object?.foundingYear ?? '',
        location: result.object?.location ?? '',
        overview: result.object?.overview ?? [],
        story: result.object?.story ?? '',
        stockTicker: result.object?.stockTicker ?? '',
      });
      console.log(result);
    },
  });

  const handleClick = async () => {
    if (!company.overview) {
      setOpen(true); // Open modal immediately
      submit(store$.company.get());
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Button
        className={`w-full h-8 sm:h-10 text-xs sm:text-sm ${
          isLoading
            ? 'bg-primary text-primary-foreground'
            : 'bg-card hover:bg-primary hover:text-primary-foreground'
        } border border-primary/30 transition-all duration-300`}
        onClick={handleClick}
        variant="outline"
        size="sm"
        disabled={isLoading}
      >
        {isLoading
          ? 'Analyzing...'
          : company.overview
          ? 'View Overview'
          : 'Generate Overview'}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[85vh] overflow-auto bg-background/95 backdrop-blur-sm border-none shadow-lg p-4 sm:p-6 text-foreground">
          <DialogHeader className="pb-2 sm:pb-3">
            <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              {company.companyName}
            </DialogTitle>
          </DialogHeader>

          <div className="py-3 sm:py-4 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {object?.stockTicker && (
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
                    Ticker
                  </span>
                  <span className="text-foreground font-semibold text-base sm:text-lg">
                    {object.stockTicker}
                  </span>
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
                  Founded
                </span>
                <span className="text-foreground text-base sm:text-lg">
                  {object?.foundingYear || (isLoading ? 'Loading...' : '')}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
                  Headquarters
                </span>
                <span className="text-foreground text-base sm:text-lg">
                  {object?.location || (isLoading ? 'Loading...' : '')}
                </span>
              </div>
            </div>

            {(object?.overview?.length! > 0 || isLoading) && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 flex items-center">
                  <span className="h-4 w-1 bg-primary rounded-full mr-2"></span>
                  Key Points
                </h3>
                {isLoading && !object?.overview?.length && (
                  <div className="text-foreground/70 text-sm">
                    Loading key points...
                  </div>
                )}
                {object?.overview && object.overview.length > 0 && (
                  <ul className="list-none space-y-2 sm:space-y-3 pl-1">
                    {object.overview.map((point, index) => (
                      <li
                        key={index}
                        className="text-foreground flex items-start text-sm sm:text-base"
                      >
                        <span className="inline-flex h-5 w-5 bg-primary/5 text-primary  mr-2 sm:mr-3 flex-shrink-0 text-xs items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-foreground/90">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {(object?.story || isLoading) && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 flex items-center">
                  <span className="h-4 w-1 bg-primary rounded-full mr-2"></span>
                  Company Story
                </h3>
                {isLoading && !object?.story ? (
                  <div className="text-foreground/70 text-sm">
                    Loading company story...
                  </div>
                ) : (
                  <p className="text-foreground/90 leading-relaxed text-sm sm:text-base">
                    {object?.story}
                  </p>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              onClick={() => setOpen(false)}
              className="bg-primary/10 hover:bg-primary/20 text-primary border-none text-xs sm:text-sm"
              variant="outline"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
