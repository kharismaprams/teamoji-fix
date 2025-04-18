import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function WhyTeamoji() {
  const features = [
    {
      title: "For Collectors",
      description: "Collect rare emoji NFTs and show off your unique style.",
      icon: "/emojis/emoji_1st_place_medal_1.svg",
    },
    {
      title: "For Creators",
      description: "Mint your own emojis and earn TEA based on their popularity.",
      icon: "/emojis/emoji_heart_1.svg",
    },
    {
      title: "For Community",
      description: "Stake TEA, vote on governance, and join the TEAMOJI vibe.",
      icon: "/emojis/emoji_star_1.svg",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 animate-fade-in">
          Why TEAMOJI? 😎
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="card animate-slide-up">
              <CardHeader>
                <Image src={feature.icon} alt={feature.title} width={40} height={40} className="mx-auto" />
                <CardTitle className="text-xl text-primary mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}