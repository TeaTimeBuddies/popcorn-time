import React from "react";
import { useWatchlist } from "../hooks/useWatchlist";

type WatchlistActionButtonProps = {
  buttonText?: string;
  movieId: string;
  className?: string;
};

const WatchlistActionButton: React.FC<WatchlistActionButtonProps> = ({
  buttonText,
  movieId,
  className,
}) => {
  const { isWatchlisted, toggleWatchlist } = useWatchlist(movieId);

  const handleClick = () => {
    toggleWatchlist();
  };

  return (
    <button
      type="button"
      className={`btn flex items-center gap-1 ${className}`}
      onClick={handleClick}
    >
      {buttonText}
      <span className="material-symbols-outlined text-lg text-primary">
        {isWatchlisted ? "remove" : "add"}
      </span>
    </button>
  );
};

export default WatchlistActionButton;
