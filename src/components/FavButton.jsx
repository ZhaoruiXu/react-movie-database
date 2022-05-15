import { AiFillHeart } from "react-icons/ai";

export default function FavButton({ handleFavButtonClick, isFav }) {
  return (
    <button className='fav-button' onClick={handleFavButtonClick}>
      <AiFillHeart style={{ fill: isFav ? "red" : "white" }} />
    </button>
  );
}
