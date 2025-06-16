import { CircleCheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PricingCardVariants = cva("rounded-lg p-4 py-6 w-full", {
  variants: {
    variant: {
      default: "bg-white text-black",
      highlighted: "bg-linear-to-br from-[#093C23] to to-[#051B16] text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const PricingCardIconVariants = cva("size-5", {
  variants: {
    variant: {
      default: "text-white fill-primary",
      highlighted: "fill-white text-black",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const pricingCardSecondaryTextVariants = cva("text-neutral-700", {
  variants: {
    variant: {
      default: "text-neutral-700",
      highlighted: "text-neutral-300",
    },
  },
});

const pricingCardBadgeVariants = cva("text-black text-xs font-normal p-1", {
  variants: {
    variant: {
      default: "bg-primary/20",
      highlighted: "bg-[#F5B797]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props extends VariantProps<typeof PricingCardVariants> {
  badge?: string | null;
  price: number;
  features: string[];
  title: string;
  description?: string | null;
  priceSuffix: string;
  className?: string;
  buttonText: string;
  onClick: () => void;
}

export const PricingCard = ({
  variant,
  badge,
  price,
  features,
  title,
  description,
  priceSuffix,
  className,
  buttonText,
  onClick,
}: Props) => {
  return (
    <div className={cn(PricingCardVariants({ variant }), className, "border")}>
      <div className="flex items-end gap-x-4 justify-between">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-2">
            <h6 className="font-medium text-xl">{title}</h6>
            {badge ? (
              <Badge className={cn(pricingCardBadgeVariants({ variant }))}>
                {badge}
              </Badge>
            ) : null}
          </div>

          <p
            className={cn(
              "text-xs",
              pricingCardSecondaryTextVariants({ variant })
            )}
          >
            {description}
          </p>
        </div>

        <div className="flex items-end shrink-0 gap-x-0.5">
          <h4 className="font-medium text-3xl">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(price)}
          </h4>

          <span className={cn(pricingCardSecondaryTextVariants({ variant }))}>
            {priceSuffix}
          </span>
        </div>
      </div>

      <Separator className="opacity-10 text-[#5D6B68]" />
      <Button
        className="w-full"
        size="lg"
        variant={variant === "highlighted" ? "default" : "outline"}
        onClick={onClick}
      >
        {buttonText}
      </Button>

      <div className="flex-col gap-2 flex mt-6">
        <p className="font-medium uppercase">Features</p>
        <ul
          className={cn(
            "flex flex-col gap-y-2.5",
            pricingCardSecondaryTextVariants({ variant })
          )}
        >
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-x-2.5">
              <CircleCheckIcon
                className={cn(PricingCardIconVariants({ variant }))}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
