export default function MoreInfoButton({
  handleMoreInfoBtnClick,
  isCardOpen,
  handleMovieCardFocus,
  handleMovieCardBlur,
}) {
  return (
    <button
      onClick={handleMoreInfoBtnClick}
      className='more-info-btn'
      style={{ pointerEvents: isCardOpen ? "" : "none" }}
      onFocus={handleMovieCardFocus}
      onBlur={handleMovieCardBlur}>
      more info
    </button>
  );
}
