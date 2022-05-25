import { movieCategories } from "../globals/globals";
import { useSelector, useDispatch } from "react-redux";
import { updateCategory } from "../features/cats/categorySlice";
import { BsFillCaretDownFill } from "react-icons/bs";

export default function CategoryBar() {
  // redux dispatch action
  const dispatch = useDispatch();

  const selectedCategory = useSelector(state => state.cats.item);

  let categoryName;
  const convertCategoryName = movieCategory => {
    switch (movieCategory) {
      case "now_playing":
        categoryName = "Now Playing";
        break;
      case "popular":
        categoryName = "Popular";
        break;
      case "top_rated":
        categoryName = "Top Rated";
        break;
      case "upcoming":
        categoryName = "Upcoming";
        break;
      default:
        categoryName = "Popular";
    }
    return categoryName;
  };

  const handleCategoryChange = e => {
    dispatch(updateCategory(e.target.value));
  };

  return (
    <div className='movie-category-wrapper'>
      <button className='display-category-button'>
        {convertCategoryName(selectedCategory)}
        <BsFillCaretDownFill />
      </button>

      <div className='movie-category-container'>
        {movieCategories.map((movieCategory, index) => {
          return (
            <button
              key={index}
              value={movieCategory}
              onClick={handleCategoryChange}>
              {convertCategoryName(movieCategory)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
