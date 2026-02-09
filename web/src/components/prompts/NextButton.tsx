import { Button } from "@/components/ui/Button";

interface NextButtonProps {
  visible: boolean;
  isLast: boolean;
  onNext: () => void;
}

export function NextButton({ visible, isLast, onNext }: NextButtonProps) {
  if (!visible) return null;

  return (
    <div className="mt-6 flex justify-center">
      <Button onClick={onNext} size="lg">
        {isLast ? "See Results" : "Next"}
      </Button>
    </div>
  );
}
