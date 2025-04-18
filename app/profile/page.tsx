"use client";

import { useProfileState } from "@/hooks/useProfileState";
import { HeroSection } from "@/components/profile/HeroSection";
import { StatsGrid } from "@/components/profile/StatsGrid";
import { RolesAndAchievements } from "@/components/profile/RolesAndAchievements";
import { NFTCollection } from "@/components/profile/NFTCollection";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { DEFAULT_ADMIN_ROLE, DAO_ROLE, AIRDROP_ROLE, FUSION_ROLE, SEASONAL_ROLE, PRICE_ROLE } from "@/lib/roles";

export default function ProfilePage() {
  const {
    address,
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
  } = useProfileState();

  const roles = [
    { role: isAdmin, name: "Admin", color: "bg-cyan-400" },
    { role: isDaoMember, name: "DAO Member", color: "bg-lime-400" },
    { role: isAirdropper, name: "Airdropper", color: "bg-yellow-400" },
    { role: isFuser, name: "Fuser", color: "bg-purple-400" },
    { role: isSeasonal, name: "Seasonal", color: "bg-pink-400" },
    { role: isPricer, name: "Pricer", color: "bg-blue-400" },
  ].filter((r) => r.role).map((r) => ({ name: r.name, color: r.color }));

  const achievements = [
    Number(balance) >= 10 && { name: "Top Collector", icon: "🏆" },
    Number(balance) >= 1 && { name: "Early Adopter", icon: "🌟" },
    isDaoMember && { name: "Governance Pro", icon: "🗳️" },
  ].filter(Boolean) as { name: string; icon: string }[];

  const fetchCollection = () => {
    setError(null);
    useProfileState().fetchCollection();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Header />
      <section className="py-12 bg-gradient-to-b from-navy-950 to-navy-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {address ? (
            <>
              <HeroSection
                address={address}
                bio={bio}
                isEditingBio={isEditingBio}
                setBio={setBio}
                setIsEditingBio={setIsEditingBio}
                profilePicture={profilePicture}
                showProfileOptions={showProfileOptions}
                setShowProfileOptions={setShowProfileOptions}
                profilePictureOptions={profilePictureOptions}
                handleSaveBio={handleSaveBio}
                handleCopyAddress={handleCopyAddress}
                handleChangeProfilePicture={handleChangeProfilePicture}
                balance={balance}
                isAdmin={isAdmin}
                isDaoMember={isDaoMember}
                isAirdropper={isAirdropper}
                isFuser={isFuser}
                isSeasonal={isSeasonal}
                isPricer={isPricer}
                collection={collection} // Pass collection
              />
              <StatsGrid balance={balance} rolesLength={roles.length} />
              <RolesAndAchievements roles={roles} achievements={achievements} />
              <NFTCollection
                collection={collection}
                isLoading={isLoading}
                error={error}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                fetchCollection={fetchCollection}
              />
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-4">
                Please connect your wallet to view your profile.
              </p>
              <Button className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition">
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}