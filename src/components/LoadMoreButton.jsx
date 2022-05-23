export default function LoadMoreButton({ handleLoadMoreBtnClick, reference }) {
  return (
    <button
      onClick={handleLoadMoreBtnClick}
      ref={reference}
      className='load-more-button'
      aria-label='Load more movie button'>
      load more
    </button>
  );
}
