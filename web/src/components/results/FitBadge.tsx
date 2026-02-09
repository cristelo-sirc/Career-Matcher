import { Badge, type FitBandVariant } from "@/components/ui/Badge";

export interface FitBadgeProps {
  fitBand: string;
}

function bandToVariant(band: string): FitBandVariant {
  switch (band) {
    case "Strong fit":
      return "strong";
    case "Possible fit":
      return "possible";
    case "Stretch":
      return "stretch";
    default:
      return "unlikely";
  }
}

export function FitBadge({ fitBand }: FitBadgeProps) {
  return <Badge variant={bandToVariant(fitBand)} />;
}
