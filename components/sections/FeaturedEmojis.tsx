import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturedEmojis() {
  const emojis = [
    { tokenId: 1, name: "1st Place Medal", image: "/emojis/emoji_1st_place_medal_1.svg", category: "Symbols" },
    { tokenId: 2, name: "Heart", image: "/emojis/emoji_heart_suit_1.svg", category: "Symbols" },
    { tokenId: 3, name: "Star", image: "/emojis/emoji_star_1.svg", category: "Objects" },
    { tokenId: 4, name: "Pizza", image: "/emojis/emoji_pizza_1.svg", category: "Food" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center animate-fade-in">
          Featured Emojis 🔥
        </h2>
        <div className="flex overflow-x-auto snap-x space-x-4 pb-4">
          {emojis.map((emoji) => (
            <div key={emoji.tokenId} className="card snap-center min-w-[200px]">
              <Image
                src={emoji.image}
                alt={emoji.name}
                width={150}
                height={150}
                className="w-full h-auto rounded-md"
                loading="lazy"
              />
              <h3 className="mt-2 text-lg font-semibold text-foreground">{emoji.name}</h3>
              <p className="text-sm text-muted-foreground">{emoji.category}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 animate-fade-in">
          <Button asChild className="btn-primary">
            <Link href="/mint">View All Emojis</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}