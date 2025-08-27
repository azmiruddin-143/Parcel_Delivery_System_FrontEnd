// src/components/CallToAction.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

interface CallToActionProps {
  headline: string;
  buttonText: string;
  buttonLink: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ headline, buttonText, buttonLink }) => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <Card className="flex flex-col items-center p-8 text-center shadow-lg md:flex-row md:justify-between md:p-10">
          <CardHeader className="p-0 mb-4 md:mb-0 md:text-left">
            <CardTitle className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {headline}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Button asChild size="lg" className="px-8 py-3 md:px-10 md:py-6 text-lg font-semibold rounded-full shadow-lg">
              <a href={buttonLink} className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>{buttonText}</span>
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CallToAction;