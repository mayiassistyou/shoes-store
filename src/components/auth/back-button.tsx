"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

function BackButton({
  href,
  label,
}: {
  href: string;
  label: string;
}): JSX.Element {
  return (
    <Button asChild variant={"link"} className="w-full font-medium">
      <Link aria-label={label} href={href}>
        {label}
      </Link>
    </Button>
  );
}

export default BackButton;
