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
}: HeroSectionProps) => {
  const shareUrl = `https://x.com/intent/tweet?text=Check%20out%20my%20TEAMOJI%20profile!%20${address}%20%F0%9F%8E%89%20Join%20at%20teamoji.com`;
  const explorerUrl = `https://sepolia.tea.xyz/address/${address}`; // Placeholder

  // State untuk slideshow
  const [currentNFTIndex, setCurrentNFTIndex] = useState(0);

  // Ambil maksimal 5 NFT untuk slideshow
  const featuredNFTs = collection.length > 0 
    ? collection.sort((a, b) => Number(a.tokenId) - Number(b.tokenId)).slice(0, 5)
    : [];

  // Slideshow otomatis
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
    <div className="relative bg-navy-900 rounded-lg p-6 sm:p-8 mb-12 shadow-lg drop-shadow-neon animate-fade-in">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* PFP */}
        <div className="relative flex-shrink-0">
          <img
            src={profilePicture}
            alt="Profile Picture"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-lime-300 object-cover"
            onError={(e) => (e.currentTarget.src = "/emojis/placeholder.svg")}
          />
          <button
            onClick={() => setShowProfileOptions(!showProfileOptions)}
            className="absolute bottom-0 right-0 bg-cyan-400 text-navy-900 p-2 rounded-full shadow-md hover:bg-cyan-500 transition"
          >
            ✏️
          </button>
          {showProfileOptions && (
            <div className="absolute z-10 mt-2 bg-gray-200 rounded-lg p-4 w-64">
              <p className="text-navy-900 font-semibold mb-2">Choose a profile picture:</p>
              <div className="grid grid-cols-5 gap-2">
                {profilePictureOptions.map((option) => (
                  <div key={option.src} className="flex items-center justify-center">
                    <img
                      src={option.src}
                      alt={option.name}
                      className="w-10 h-10 rounded-full cursor-pointer bg-gray-200 border-2 border-lime-300 hover:border-4 hover:border-lime-400 transition"
                      onClick={() => handleChangeProfilePicture(option.src)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Info dan NFT Showcase */}
        <div className="flex-1 flex flex-col lg:flex-row items-start gap-6">
          {/* Info */}
          <div className="flex-1 py-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 text-center sm:text-left">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </h1>
            <div className="mt-1 flex flex-wrap gap-3 justify-center sm:justify-start">
              <span className="text-sm text-muted-foreground bg-navy-800 px-1 py-1 rounded-full">
              💎 NFTs Owned: {balance ? Number(balance) : 0}
              </span>
            </div>
            {isEditingBio ? (
              <div className="mt-2">
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 100))}
                  placeholder="Enter your bio..."
                  className="bg-card text-foreground border-2 border-cyan-400 rounded-lg p-2 w-full max-w-xs"
                />
                <div className="mt-2 flex gap-2 justify-center sm:justify-start">
                  <Button onClick={handleSaveBio} className="btn-primary">
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditingBio(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p
                className="text-lg text-muted-foreground mt-3 cursor-pointer hover:text-cyan-400 text-center sm:text-left"
                onClick={() => setIsEditingBio(true)}
              >
                {bio || "Click to add a bio..."}
              </p>
            )}
          </div>
          {/* NFT Showcase Mini (Slideshow) */}
          {featuredNFTs.length > 0 && (
            <div className="bg-navy-800 rounded-lg p-2 w-full lg:w-64">
              <h3 className="text-base font-semibold text-yellow-400 mb-2">Featured NFT</h3>
              <img
                src={currentNFT.image}
                alt={currentNFT.name}
                className="w-full h-28 object-cover rounded-md mb-2 transition-opacity duration-500"
                onError={(e) => (e.currentTarget.src = "/emojis/placeholder.svg")}
              />
              <p className="text-sm text-foreground truncate">{currentNFT.name}</p>
              <p className="text-xs text-muted-foreground">Token ID: {currentNFT.tokenId.toString()}</p>
            </div>
          )}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-1 flex flex-wrap gap-4 justify-center sm:justify-start"> {/* Ubah mt-6 jadi mt-4 */}
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
          <Button className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4">
            Share on X 🚀
          </Button>
        </a>
        <Button
          onClick={handleCopyAddress}
          className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4"
        >
          Copy Address 📋
        </Button>
        <Link href="/mint">
          <Button className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4">
            Mint NFT 🖼️
          </Button>
        </Link>
        <Button
          onClick={() => alert("Marketplace feature coming soon!")}
          className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4"
        >
          Explore Marketplace 🛒
        </Button>
        <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
          <Button className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4">
            Explorer 🔗
          </Button>
        </a>
      </div>
    </div>
  );
};