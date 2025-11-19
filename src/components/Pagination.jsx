export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const adjustedStart = Math.max(1, endPage - 4);

  for (let i = adjustedStart; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (adjustedStart > 1) {
    pageNumbers.unshift("...");
    pageNumbers.unshift(1);
  }

  if (endPage < totalPages) {
    pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
      >
        Anterior
      </button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {pageNumbers.map((pageNum, index) => (
          pageNum === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded-lg transition ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
              }`}
            >
              {pageNum}
            </button>
          )
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
      >
        Próximo
      </button>

      {/* Page info */}
      <span className="ml-4 text-sm text-gray-600">
        Página {currentPage} de {totalPages}
      </span>
    </div>
  );
}
