// src/components/MissionStatement.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';

const MissionStatement = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <Card className="p-8 md:p-12 text-center md:text-left">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Target className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">To Be the Best</h3>
              <p className="text-muted-foreground">
                We strive to be the leading parcel delivery service, setting new standards for efficiency and customer care.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <Lightbulb className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                By leveraging cutting-edge technology, we are constantly innovating to make your delivery experience smoother.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <TrendingUp className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-2">Growth</h3>
              <p className="text-muted-foreground">
                We are committed to expanding our services and reaching more people, one delivery at a time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MissionStatement;