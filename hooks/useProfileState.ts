import { useState, useEffect } from "react";
import { useAccount, useContractRead, usePublicClient } from "wagmi";
import { toast } from "sonner";
import { fetchCollection, CollectionItem } from "@/lib/fetchCollection"; // Impor tipe CollectionItem
import { teamojiAbi } from "@/lib/contract";
import { DEFAULT_ADMIN_ROLE, DAO_ROLE, AIRDROP_ROLE, FUSION_ROLE, SEASONAL_ROLE, PRICE_ROLE } from "@/lib/roles";

export const useProfileState = () => {
  const { address, chain } = useAccount();
  const publicClient = usePublicClient();
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [sortBy, setSortBy] = useState<"tokenId" | "name" | "category">("tokenId");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const itemsPerPage = 8;

  const [profilePicture, setProfilePicture] = useState("/emojis/emoji_rocket_1.svg");
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const profilePictureOptions = [
    { name: "Rocket", src: "/emojis/emoji_rocket_1.svg" },
    { name: "Star", src: "/emojis/emoji_star_1.svg" },
    { name: "Trophy", src: "/emojis/emoji_trophy_1.svg" },
    { name: "Medal", src: "/emojis/emoji_1st_place_medal_1.svg" },
    { name: "Avocado", src: "/emojis/emoji_avocado_1.svg" },
    { name: "Face Without Mouth", src: "/emojis/emoji_face_without_mouth_1.svg" },
    { name: "Radio Button", src: "/emojis/emoji_radio_button_1.svg" },
    { name: "Sparkles", src: "/emojis/emoji_sparkles_1.svg" },
    { name: "Sun", src: "/emojis/emoji_sun_1.svg" },
    { name: "Coin", src: "/emojis/emoji_coin_1.svg" },
    { name: "Rainbow", src: "/emojis/emoji_rainbow_1.svg" },
    { name: "Pizza", src: "/emojis/emoji_pizza_1.svg" },
    { name: "Currency", src: "/emojis/emoji_currency_exchange_1.svg" },
    { name: "Pie", src: "/emojis/emoji_pie_1.svg" },
    { name: "Cat", src: "/emojis/emoji_cat_1.svg" },
    { name: "Dog", src: "/emojis/emoji_dog_1.svg" },
    { name: "Unicorn", src: "/emojis/emoji_unicorn_1.svg" },
    { name: "Ghost", src: "/emojis/emoji_ghost_1.svg" },
    { name: "Alien", src: "/emojis/emoji_alien_1.svg" },
    { name: "Smiling Face", src: "/emojis/emoji_smiling_face_with_hearts_1.svg" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (address) {
      const savedBio = localStorage.getItem(`teamoji_bio_${address}`);
      if (savedBio) setBio(savedBio);

      const savedProfilePic = localStorage.getItem(`teamoji_profile_pic_${address}`);
      if (savedProfilePic) setProfilePicture(savedProfilePic);
    }
  }, [address]);

  const { data: balance, error: balanceError } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "balanceOf",
    args: [address || "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address },
  });

  const { data: isAdmin } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "hasRole",
    args: [DEFAULT_ADMIN_ROLE, address || "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address },
  });

  const { data: isDaoMember } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "hasRole",
    args: [DAO_ROLE, address || "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address },
  });

  const { data: isAirdropper } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "hasRole",
    args: [AIRDROP_ROLE, address || "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address },
  });

  const { data: isFuser } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "hasRole",
    args: [FUSION_ROLE, address || "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address },
  });

  const { data: isSeasonal } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "hasRole",
    args: [SEASONAL_ROLE, address || "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address },
  });

  const { data: isPricer } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: teamojiAbi,
    functionName: "hasRole",
    args: [PRICE_ROLE, address || "0x0000000000000000000000000000000000000000"],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (isMounted && publicClient) {
      fetchCollection(
        address,
        balance,
        chain,
        publicClient,
        setCollection,
        setIsLoading,
        setError
      );
    }
  }, [address, balance, chain, publicClient, isMounted, balanceError]);

  const handleSaveBio = () => {
    if (address && bio) {
      localStorage.setItem(`teamoji_bio_${address}`, bio);
      toast.success("Bio updated!");
    }
    setIsEditingBio(false);
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address).then(() => {
        toast.success("Wallet address copied!");
      }).catch((err) => {
        console.error("Failed to copy address:", err);
        toast.error("Failed to copy address.");
      });
    }
  };

  const handleChangeProfilePicture = (src: string) => {
    setProfilePicture(src);
    if (address) {
      localStorage.setItem(`teamoji_profile_pic_${address}`, src);
    }
    setShowProfileOptions(false);
    toast.success("Profile picture updated!");
  };

  // Ekspos fetchCollection sebagai fungsi
  const fetchCollectionFunc = () => {
    if (publicClient) {
      fetchCollection(
        address,
        balance,
        chain,
        publicClient,
        setCollection,
        setIsLoading,
        setError
      );
    }
  };

  return {
    address,
    chain,
    collection,
    isLoading,
    error,
    setError,
    bio,
    setBio,
    isEditingBio,
    setIsEditingBio,
    sortBy,
    setSortBy,
    filterCategory,
    setFilterCategory,
    currentPage,
    setCurrentPage,
    isMounted,
    itemsPerPage,
    profilePicture,
    showProfileOptions,
    setShowProfileOptions,
    profilePictureOptions,
    handleSaveBio,
    handleCopyAddress,
    handleChangeProfilePicture,
    balance,
    isAdmin,
    isDaoMember,
    isAirdropper,
    isFuser,
    isSeasonal,
    isPricer,
    fetchCollection: fetchCollectionFunc,
  };
};