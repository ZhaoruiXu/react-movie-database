import { AiFillHeart } from "react-icons/ai";

export default function FavButton({
  handleFavButtonClick,
  isFav,
  handleFavButtonFocus,
  handleFavButtonBlur,
}) {
  return (
    <button
      className='fav-button'
      onClick={handleFavButtonClick}
      onFocus={handleFavButtonFocus}
      onBlur={handleFavButtonBlur}>
      <AiFillHeart
        className={`fav-button-svg ${isFav ? "fav-button-on" : ""}`}
      />
    </button>
  );
}
