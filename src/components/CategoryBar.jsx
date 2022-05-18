import { movieCategories } from "../globals/globals";
import { useSelector, useDispatch } from "react-redux";
import { updateCategory } from "../features/cats/categorySlice";

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
    <form className='movie-category-container'>
      <select
        name='selectCategory'
        id='selectCategory'
        className='select-movie-category'
        value={selectedCategory}
        onChange={handleCategoryChange}>
        {movieCategories.map((movieCategory, index) => {
          return (
            <option key={index} value={movieCategory}>
              {convertCategoryName(movieCategory)}
            </option>
          );
        })}
      </select>
    </form>
  );
}
