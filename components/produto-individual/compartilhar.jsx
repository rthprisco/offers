"use client";

export function Compartilhar({ productId }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Veja este produto!",
        url: shareUrl,
      });
    } else {
      alert("Copiado: " + shareUrl);
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
    >
      Compartilhar
    </button>
  );
}