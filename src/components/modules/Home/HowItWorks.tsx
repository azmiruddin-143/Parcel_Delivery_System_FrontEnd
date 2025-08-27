// src/components/HowItWorks.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Box, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Box className="h-12 w-12 text-primary" />,
    title: "1. Place Your Order",
    description: "Easily book your parcel delivery through our simple and intuitive online form."
  },
  {
    icon: <Truck className="h-12 w-12 text-primary" />,
    title: "2. We Pick It Up",
    description: "Our professional delivery team will collect the parcel from your location as scheduled."
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-primary" />,
    title: "3. Delivered to Your Door",
    description: "We ensure safe and timely delivery of your parcel to the recipient's address."
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight lg:text-5xl">
          How It Works
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          Our process is simple and transparent. Follow these easy steps to get your parcel delivered safely.
        </p>

        <div className="grid  gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="flex flex-col items-center p-6 text-center transition-all duration-300 hover:scale-105">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary p-4">
                  {step.icon}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="mb-2 text-2xl font-bold">
                  {step.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;