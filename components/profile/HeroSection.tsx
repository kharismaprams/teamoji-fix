import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroSectionProps {
  address: string | undefined;
  bio: string;
  isEditingBio: boolean;
  setBio: (bio: string) => void;
  setIsEditingBio: (editing: boolean) => void;
  profilePicture: string;
  showProfileOptions: boolean;
  setShowProfileOptions: (show: boolean) => void;
  profilePictureOptions: { name: string; src: string }[];
  handleSaveBio: () => void;
  handleCopyAddress: () => void;
  handleChangeProfilePicture: (src: string) => void;
  balance: bigint | undefined;
  collection: CollectionItem[];
  isAdmin: boolean | undefined;
  isDaoMember: boolean | undefined;
  isAirdropper: boolean | undefined;
  isFuser: boolean | undefined;
  isSeasonal: boolean | undefined;
  isPricer: boolean | undefined;
}

interface CollectionItem {
  tokenId: bigint;
  name: string;
  image: string;
  description?: string;
  category?: string;
}

export const HeroSection = ({
  address,
  bio,
  isEditingBio,
  setBio,
  setIsEditingBio,
  profilePicture,
  showProfileOptions,
  setShowProfileOptions,
  profilePictureOptions,
  handleSaveBio,
  handleCopyAddress,
  handleChangeProfilePicture,
  balance,
  collection,
  isAdmin,
  isDaoMember,
  isAirdropper,
  isFuser,
  isSeasonal,
  isPricer,
}: HeroSectionProps) => {
  const shareUrl = `https://x.com/intent/tweet?text=Check%20out%20my%20TEAMOJI%20profile!%20${address || ''}%20%F0%9F%8E%89%20Join%20at%20teamoji.art%20%F0%9F%8E%89%20%40themojinft%20%40KharismaPramS%20%F0%9F%8E%89`;
  const explorerUrl = `https://sepolia.tea.xyz/address/${address || ''}`;

  // Sticky PFP dan address
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector(".hero-section");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsSticky(rect.top <= 80);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slideshow NFT
  const [currentNFTIndex, setCurrentNFTIndex] = useState(0);
  const featuredNFTs = collection.length > 0
    ? collection.sort((a, b) => Number(a.tokenId) - Number(b.tokenId)).slice(0, 5)
    : [];

  useEffect(() => {
    if (featuredNFTs.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentNFTIndex((prevIndex) =>
        prevIndex === featuredNFTs.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredNFTs.length]);

  const currentNFT = featuredNFTs[currentNFTIndex];

  return (
    <div className="hero-section relative bg-navy-900 rounded-lg p-4 sm:p-6 mb-8 shadow-lg drop-shadow-neon animate-fade-in">
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="order-1 lg:order-1 w-full lg:w-2/3">
          <div className="card flex flex-col gap-2">
            <div className={`flex items-start gap-3 sm:gap-4 ${isSticky ? "sticky-pfp-address sticky" : "sticky-pfp-address"}`}>
              <div className="relative flex-shrink-0">
                <img
                  src={profilePicture}
                  alt="Profile Picture"
                  className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-3 border-lime-300 object-cover card-neon"
                  onError={(e) => (e.currentTarget.src = "/emojis/placeholder.svg")}
                />
                <button
                  onClick={() => setShowProfileOptions(!showProfileOptions)}
                  className="absolute bottom-0 right-0 bg-cyan-400 text-navy-900 p-1 rounded-full shadow-md hover:bg-cyan-500 transition filter-neon"
                >
                  ✏️
                </button>
                {showProfileOptions && (
                  <div className="absolute z-10 mt-2 bg-navy-900 rounded-lg p-3 w-48 animate-fade-in">
                    <p className="text-gray-200 font-semibold mb-2">Choose a profile picture:</p>
                    <div className="grid grid-cols-5 gap-2">
                      {profilePictureOptions.map((option) => (
                        <div key={option.src} className="flex items-center justify-center">
                          <img
                            src={option.src}
                            alt={option.name}
                            className="w-8 h-8 rounded-full cursor-pointer bg-navy-900 border-2 border-lime-300 hover:border-3 hover:border-lime-400 transition card-neon"
                            onClick={() => handleChangeProfilePicture(option.src)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 w-21">
                <h1 className="text-lg sm:text-xl lg:text-5xl font-bold text-yellow-400 text-center sm:text-left">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "No Address"}
                </h1>
                <span className="text-m text-muted-foreground bg-navy-900 px-2 py-1 rounded-full tag-neon">
                 💎 NFTs Owned: {balance ? Number(balance) : 0}
                </span>
              </div>
            </div>
            <div className="py-1 ml-[80px] sm:ml-[90px] lg:ml-[110px] w-full max-w-[calc(100%-120px)]">
              {isEditingBio ? (
                <div className="mt-1">
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, 100))}
                    placeholder="Enter your bio..."
                    className="bg-card text-foreground border-2 border-cyan-400 rounded-lg p-1 w-full max-w-xs filter-neon"
                  />
                  <div className="mt-2 flex gap-2 justify-center sm:justify-start">
                    <Button onClick={handleSaveBio} className="btn-primary filter-neon">
                      Save
                    </Button>
                    <Button
                      onClick={() => setIsEditingBio(false)}
                      className="btn-primary filter-neon"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p
                  className="text-base text-muted-foreground cursor-pointer hover:text-cyan-400 text-center sm:text-left neon-glow"
                  onClick={() => setIsEditingBio(true)}
                >
                  {bio || "Click to add a bio..."}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-2 flex flex-col lg:flex-row items-start gap-6 order-2 lg:order-2">
          {featuredNFTs.length > 0 && (
            <div className="bg-navy-900 rounded-lg p-1 w-full lg:w-64 card-neon">
              <h1 className="text-sm font-semibold text-yellow-400 mb-1">Featured NFT</h1>
              <img
                src={currentNFT.image}
                alt={currentNFT.name}
                className="w-full h-28 object-cover rounded-md mb-1 transition-opacity duration-500 card-neon"
                onError={(e) => (e.currentTarget.src = "/emojis/placeholder.svg")}
              />
              <p className="text-xs text-foreground truncate">{currentNFT.name}</p>
              <p className="text-xs text-muted-foreground">Token ID: {currentNFT.tokenId.toString()}</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 justify-center sm:justify-start">
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
          <Button className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4 filter-neon">
            Share on X 🚀
          </Button>
        </a>
        <Button
          onClick={handleCopyAddress}
          className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4 filter-neon"
        >
          Copy Address 📋
        </Button>
        <Link href="https://discord.gg/BEnevQJgA6">
          <Button className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4 filter-neon">
            Discord 🏘️
          </Button>
        </Link>
        <Button
          onClick={() => alert("Marketplace feature coming soon!")}
          className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4 filter-neon"
        >
          Explore Marketplace 🛒
        </Button>
        <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
          <Button className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4 filter-neon">
            Explorer 🔗
          </Button>
        </a>
      </div>
    </div>
  );
};