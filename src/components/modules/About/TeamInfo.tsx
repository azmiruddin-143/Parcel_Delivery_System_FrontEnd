// src/components/TeamInfo.tsx

import { Card, CardContent,  CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const teamMembers = [
  {
    name: "Rahim Khan",
    role: "CEO & Founder",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    bio: "Rahim has over 15 years of experience in logistics and is passionate about solving delivery challenges."
  },
  {
    name: "Shila Ahmed",
    role: "Head of Operations",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    bio: "Shila manages our entire delivery network, ensuring every parcel is handled with care and efficiency."
  },
  {
    name: "Kamal Hossain",
    role: "Lead Developer",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    bio: "Kamal is the mastermind behind our advanced tracking system and user-friendly web platform."
  }
];

const TeamInfo = () => {
  return (
    <section className="py-24 bg-card-foreground/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight lg:text-5xl">
          Meet Our Team
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          Behind every successful delivery is a team of dedicated professionals.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card key={index} className="flex flex-col items-center p-6 text-center shadow-lg transition-all duration-300 hover:scale-105">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mb-1 text-2xl font-bold">
                {member.name}
              </CardTitle>
              <p className="text-primary font-semibold mb-4">{member.role}</p>
              <CardContent className="p-0">
                <p className="text-muted-foreground">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamInfo;