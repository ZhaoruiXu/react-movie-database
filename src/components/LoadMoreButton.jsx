export default function LoadMoreButton({ handleLoadMoreBtnClick, reference }) {
  return (
    <button
      onClick={handleLoadMoreBtnClick}
      ref={reference}
      className='load-more-button'>
      load more
    </button>
  );
}
