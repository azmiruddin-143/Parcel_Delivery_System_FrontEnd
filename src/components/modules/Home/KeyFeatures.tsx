// src/components/KeyFeatures.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Headset, ShieldCheck, Clock } from 'lucide-react';

const features = [
  {
    icon: <Plane className="h-8 w-8 text-primary" />,
    title: "Real-time Tracking",
    description: "Keep an eye on your parcels with our live tracking feature. Know exactly where your package is at all times."
  },
  {
    icon: <Headset className="h-8 w-8 text-primary" />,
    title: "24/7 Customer Support",
    description: "Our dedicated support team is available around the clock to assist you with any queries or concerns."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Secure Packaging",
    description: "We use high-quality packaging materials to ensure your items are safe and secure throughout the journey."
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Flexible Delivery Options",
    description: "Choose from various delivery options that best fit your schedule, including same-day and next-day delivery."
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight lg:text-5xl">
          Key Features
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          Discover the unique features that make our parcel delivery service stand out from the rest.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center p-6 text-center transition-all duration-300 hover:scale-105">
              <CardHeader className="flex items-center justify-center p-0 mb-4">
                <div className="rounded-full bg-primary/10 p-4">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="mb-2 text-2xl font-bold">
                  {feature.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;