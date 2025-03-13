import { Squares } from "@/components/ui/squares-background";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
export default function SquaresDemo() {
  return (
    <div className="absolute flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  ">
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </div>
  );
}
