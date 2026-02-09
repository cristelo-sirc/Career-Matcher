import { DimensionBar } from "@/components/ui/DimensionBar";
import type { UserDimensionProfile } from "@core/types.js";
import { DIMENSION_META, ALL_DIMENSIONS, type Dimension } from "@core/dimensions.js";

export interface ProfileSummaryProps {
  profile: UserDimensionProfile;
}

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  return (
    <section aria-labelledby="profile-heading">
      <h2
        id="profile-heading"
        className="text-xl font-bold text-text dark:text-text-dark"
      >
        Your Preference Profile
      </h2>
      <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
        Here&apos;s what you told us about how you like to work.
      </p>
      <div className="mt-4 space-y-5">
        {ALL_DIMENSIONS.map((dim: Dimension) => {
          const meta = DIMENSION_META[dim];
          const value = profile[dim];
          return (
            <DimensionBar
              key={dim}
              label={meta.label}
              levels={meta.levels}
              selectedValue={value}
              ordinal={meta.ordinal}
            />
          );
        })}
      </div>
    </section>
  );
}
