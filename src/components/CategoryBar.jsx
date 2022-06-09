import { React, useState, useEffect, useRef } from "react";
import { movieCategories } from "../globals/globals";
import { useSelector, useDispatch } from "react-redux";
import { updateCategory } from "../features/cats/categorySlice";
import { BsFillCaretDownFill } from "react-icons/bs";

export default function CategoryBar() {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);
  const insiderCatBar = useRef(null);
  const insideCategoryBtn = useRef([]);
  // redux dispatch action
  const dispatch = useDispatch();
  const selectedCategory = useSelector(state => state.cats.item);

  useEffect(() => {
    const listener = e => {
      if (e.matches) {
        setIsDesktopView(true);
      } else {
        setIsDesktopView(false);
      }
    };

    let mediaQuery = window.matchMedia("(min-width: 56.25rem)");

    listener(mediaQuery);

    mediaQuery.addEventListener("change", listener);
    // this is the cleanup function to remove the listener
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const listener = e => {
      if (
        insiderCatBar.current &&
        e.target &&
        !insiderCatBar.current.contains(e.target) &&
        isCategoryMenuOpen
      ) {
        setIsCategoryMenuOpen(false);
        return;
      }
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [isCategoryMenuOpen]);

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

  const handleCategoryChange = (e, index) => {
    dispatch(updateCategory(e.target.value));
    insideCategoryBtn.current[index].blur();
    if (!isDesktopView) {
      setIsCategoryMenuOpen(!isCategoryMenuOpen);
    } else {
      setIsCategoryMenuOpen(false);
    }
  };

  const handleCategoryButton = () => {
    if (!isDesktopView) {
      setIsCategoryMenuOpen(!isCategoryMenuOpen);
    } else {
      setIsCategoryMenuOpen(false);
    }
  };

  return (
    <div className='movie-category-wrapper' ref={insiderCatBar}>
      <button
        className={`display-category-button ${
          !isDesktopView && isCategoryMenuOpen ? "flip-svg-up" : "flip-svg-down"
        }`}
        onClick={handleCategoryButton}>
        <p>{convertCategoryName(selectedCategory)}</p>
        <BsFillCaretDownFill />
      </button>

      <div
        className={`movie-category-container ${
          !isDesktopView && isCategoryMenuOpen ? "expand" : ""
        }`}>
        {movieCategories.map((movieCategory, index) => {
          return (
            <button
              // Work around for useRef in an array of DOMs
              ref={el => (insideCategoryBtn.current[index] = el)}
              tabIndex={isDesktopView ? 0 : isCategoryMenuOpen ? 0 : -1}
              className={
                isDesktopView && selectedCategory === movieCategory
                  ? "current-category"
                  : ""
              }
              key={index}
              value={movieCategory}
              onClick={e => handleCategoryChange(e, index)}>
              {convertCategoryName(movieCategory)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
