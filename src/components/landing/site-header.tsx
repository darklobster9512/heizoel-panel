import { Link } from "@tanstack/react-router";

import { Logo } from "./logo";
import { RatingBadge } from "./rating-badge";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background shadow-header-strong">
      <div className="mx-auto grid h-[52px] max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:flex md:h-16 md:justify-between">
        <Link
          to="/"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <Logo className="h-auto w-[100px] text-smava-logo md:w-[126px]" />
        </Link>

        <div className="flex shrink-0 items-center gap-4 md:hidden">
          <RatingBadge compact />
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <RatingBadge />
        </div>
      </div>
    </header>
  );
}
