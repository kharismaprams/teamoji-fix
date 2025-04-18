import { Card, CardContent } from "@/components/ui/card";

interface StatsGridProps {
  balance: bigint | undefined;
  rolesLength: number;
}

export const StatsGrid = ({ balance, rolesLength }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <Card className="card animate-slide-up">
        <CardContent className="pt-6 text-center">
          <p className="text-2xl font-bold text-lime-400">{balance ? Number(balance) : 0}</p>
          <p className="text-muted-foreground">NFTs Owned</p>
        </CardContent>
      </Card>
      <Card className="card animate-slide-up">
        <CardContent className="pt-6 text-center">
          <p className="text-2xl font-bold text-lime-400">
            {(Number(balance) || 0) * 1} TEA
          </p>
          <p className="text-muted-foreground">Est. Collection Value</p>
        </CardContent>
      </Card>
      <Card className="card animate-slide-up">
        <CardContent className="pt-6 text-center">
          <p className="text-2xl font-bold text-lime-400">{rolesLength || 1}</p>
          <p className="text-muted-foreground">Active Roles</p>
        </CardContent>
      </Card>
      <Card className="card animate-slide-up">
        <CardContent className="pt-6 text-center">
          <p className="text-2xl font-bold text-lime-400">{Number(balance) || 0}</p>
          <p className="text-muted-foreground">Mints (Est.)</p>
        </CardContent>
      </Card>
    </div>
  );
};