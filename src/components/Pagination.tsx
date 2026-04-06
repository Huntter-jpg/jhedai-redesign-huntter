import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  buildUrl: (page: number) => string;
}

const Pagination = ({ currentPage, totalPages, buildUrl }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | "...")[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="Paginación"
      className="flex items-center justify-center gap-2 mt-12"
    >
      {currentPage > 1 ? (
        <Link
          to={buildUrl(currentPage - 1)}
          className="text-[14px] font-semibold text-jhedai-primary/60 hover:text-jhedai-primary flex items-center gap-1 transition-colors"
        >
          <ChevronLeft size={16} />
          Anterior
        </Link>
      ) : (
        <span className="text-[14px] font-semibold text-jhedai-primary/20 flex items-center gap-1">
          <ChevronLeft size={16} />
          Anterior
        </span>
      )}

      <div className="flex items-center gap-1 mx-4">
        {pageNumbers.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-10 h-10 flex items-center justify-center text-jhedai-primary/30 text-[14px]"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              to={buildUrl(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-[14px] font-medium transition-all ${
                page === currentPage
                  ? "bg-jhedai-primary text-white"
                  : "text-jhedai-primary/60 hover:bg-jhedai-primary/5"
              }`}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          to={buildUrl(currentPage + 1)}
          className="text-[14px] font-semibold text-jhedai-primary/60 hover:text-jhedai-primary flex items-center gap-1 transition-colors"
        >
          Siguiente
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="text-[14px] font-semibold text-jhedai-primary/20 flex items-center gap-1">
          Siguiente
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
};

export default Pagination;
