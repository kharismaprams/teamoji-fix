interface RolesAndAchievementsProps {
    roles: { name: string; color: string }[];
    achievements: { name: string; icon: string }[];
  }
  
  export const RolesAndAchievements = ({ roles, achievements }: RolesAndAchievementsProps) => {
    return (
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-foreground mb-4">Roles & Achievements🏅</h3>
        <div className="flex flex-wrap gap-4">
          {roles.map((role) => (
            <span
              key={role.name}
              className={`${role.color} text-navy-900 font-semibold px-3 py-1 rounded-full text-sm animate-fade-in`}
            >
              {role.name}
            </span>
          ))}
          {achievements.map((ach) => (
            <span
              key={ach.name}
              className="bg-cyan-400 text-navy-900 font-semibold px-3 py-1 rounded-full text-sm animate-fade-in"
            >
              {ach.icon} {ach.name}
            </span>
          ))}
        </div>
      </div>
    );
  };