export default function MoreInfoButton({ handleMoreInfoBtnClick, isCardOpen }) {
  return (
    <button
      onClick={handleMoreInfoBtnClick}
      className='more-info-btn'
      style={{ pointerEvents: isCardOpen ? "" : "none" }}>
      more info
    </button>
  );
}
