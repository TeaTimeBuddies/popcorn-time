import React from 'react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoritesButtonProps {
    movieId: string;
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({ movieId }) => {
    const { isFavorited, toggleFavorite } = useFavorites(movieId);
  
    return (
        <button onClick={() => toggleFavorite()} className="material-icons" aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}>
          {isFavorited ? 'favorite' : 'favorite_border'}
        </button>
      );
    };
  
  export default FavoritesButton;
  