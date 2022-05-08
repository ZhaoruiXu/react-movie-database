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

  const handleCategoryClick = movieCategory => {
    dispatch(updateCategory(movieCategory));
  };

  return (
    <div className='movie-category-container'>
      {movieCategories.map((movieCategory, index) => {
        return (
          <div
            className='movie-category'
            style={{
              color: selectedCategory === movieCategory ? "red" : "black",
            }}
            key={index}
            onClick={() => handleCategoryClick(movieCategory)}>
            {convertCategoryName(movieCategory)}
          </div>
        );
      })}
    </div>
  );
}
