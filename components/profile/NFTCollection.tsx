import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NFTCollectionProps {
  collection: CollectionItem[];
  isLoading: boolean;
  error: string | null;
  sortBy: "tokenId" | "name" | "category";
  setSortBy: (sortBy: "tokenId" | "name" | "category") => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  fetchCollection: () => void;
}

interface CollectionItem {
  tokenId: bigint;
  name: string;
  image: string;
  description?: string;
  category?: string;
}

export const NFTCollection = ({
  collection,
  isLoading,
  error,
  sortBy,
  setSortBy,
  filterCategory,
  setFilterCategory,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  fetchCollection,
}: NFTCollectionProps) => {
  const categories = Array.from(new Set(collection.map(item => item.category || "Unknown")));
  categories.unshift("All");

  const filteredCollection = filterCategory === "All"
    ? [...collection]
    : collection.filter(item => (item.category || "Unknown") === filterCategory);

  const sortedCollection = [...filteredCollection].sort((a, b) => {
    if (sortBy === "tokenId") {
      return Number(a.tokenId) - Number(b.tokenId);
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return (a.category || "Unknown").localeCompare(b.category || "Unknown");
    }
  });

  const totalPages = Math.ceil(sortedCollection.length / itemsPerPage);
  const paginatedCollection = sortedCollection.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-2xl font-semibold text-foreground">Your Collection🎨</h3>
        <div className="flex items-center gap-4">
          <select
            className="bg-card text-muted-foreground border-2 border-lime-300 rounded-lg p-2 filter-neon"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "tokenId" | "name" | "category")}
          >
            <option value="tokenId">Sort by Token ID</option>
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      {/* Tombol Filter Kategori */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => {
              setFilterCategory(category);
              setCurrentPage(1);
            }}
            className={`${
              filterCategory === category
                ? "bg-lime-400 text-navy-900"
                : "bg-navy-800 text-foreground border-2 border-lime-300"
            } px-4 py-2 rounded-lg hover:bg-lime-300 hover:text-navy-900 transition filter-neon`}
          >
            {category}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-12 w-12 border-4 border-t-lime-400 border-navy-800 rounded-full" />
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchCollection} className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4 filter-neon">
            Retry
          </Button>
        </div>
      ) : paginatedCollection.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No NFTs found{filterCategory !== "All" ? ` in "${filterCategory}" category` : ""}.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedCollection.map((item) => (
              <Card key={item.tokenId.toString()} className="card animate-slide-up card-neon">
                <CardContent className="flex flex-col items-center pt-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4 card-neon"
                    onError={(e) => (e.currentTarget.src = "/emojis/placeholder.svg")}
                  />
                  <h3 className="text-lg font-semibold text-yellow-400 text-center">{item.name}</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Token ID: {item.tokenId.toString()}
                  </p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-2 text-center max-w-xs">{item.description}</p>
                  )}
                  {item.category && (
                    <p className="text-sm text-muted-foreground mt-1 text-center">Category: {item.category}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2 items-center">
              <Button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4 filter-neon"
              >
                ◀️Previous
              </Button>
              <span className="text-foreground font-semibold bg-navy-800 px-4 py-2 rounded-lg border-2 border-lime-300 filter-neon">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn-primary border-2 border-lime-300 hover:bg-lime-300 hover:text-navy-900 transition ring-2 ring-lime-300 focus:ring-4 filter-neon"
              >
                Next▶️
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};