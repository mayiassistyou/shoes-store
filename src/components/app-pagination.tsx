"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  page: number;
  pageSize: number;
  total: number;
};

function AppPagination({ page, pageSize, total }: Props) {
  const lastPage = Math.ceil(total / pageSize) || 0;
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  function goToPage(page: number) {
    params.set("page", page.toString());

    return replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          {page !== 1 && (
            <PaginationPrevious onClick={() => goToPage(page - 1)} />
          )}
        </PaginationItem>
        {page > 3 && (
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(page - 2)}>
              {Number(page - 2)}
            </PaginationLink>
          </PaginationItem>
        )}
        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(page - 1)}>
              {Number(page - 1)}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {page < lastPage && (
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(page + 1)}>
              {Number(page) + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < lastPage - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(page + 2)}>
              {Number(page) + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < lastPage - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page < lastPage - 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => goToPage(lastPage)}>
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {page !== lastPage && (
          <PaginationItem>
            <PaginationNext onClick={() => goToPage(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default AppPagination;
