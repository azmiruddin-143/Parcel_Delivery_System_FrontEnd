// src/components/ServiceDescription.tsx

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, Smile } from 'lucide-react';

const ServiceDescription = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Our Mission
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
            We are dedicated to providing seamless, secure, and swift delivery solutions that connect people and businesses.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:scale-105">
            <CardHeader className="p-0 mb-4">
              <Package className="h-12 w-12 text-primary" />
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className="mb-2 text-2xl font-bold">
                Reliability
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                We ensure your parcels reach their destination on time, every time, with our advanced logistics network.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:scale-105">
            <CardHeader className="p-0 mb-4">
              <Truck className="h-12 w-12  text-primary" />
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className="mb-2 text-2xl font-bold">
                Speed
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Our optimized delivery routes and professional team guarantee the fastest delivery possible.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:scale-105">
            <CardHeader className="p-0 mb-4">
              <Smile className="h-12 w-12 text-primary" />
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className="mb-2 text-2xl font-bold">
                Customer Satisfaction
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your happiness is our priority. We offer 24/7 support and hassle-free service to meet your needs.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServiceDescription;