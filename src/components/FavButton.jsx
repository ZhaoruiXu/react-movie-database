import { AiFillHeart } from "react-icons/ai";

export default function FavButton({ handleFavButtonClick, isFav }) {
  return (
    <button
      className='fav-button'
      onClick={handleFavButtonClick}
      aria-label='Favourite movie button'>
      <AiFillHeart
        className={`fav-button-svg ${isFav ? "fav-button-on" : ""}`}
      />
    </button>
  );
}
