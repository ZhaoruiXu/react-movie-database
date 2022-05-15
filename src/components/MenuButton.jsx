import { useDispatch, useSelector } from "react-redux";
import { updateNavState } from "../features/nav/navSlice";

export default function MenuButton({ reference }) {
  const isNavOpen = useSelector(state => state.navState.item);
  const dispatch = useDispatch();

  return (
    <button
      className='menu-button'
      ref={reference}
      onMouseDown={e => {
        e.preventDefault();
      }}
      onClick={() => {
        dispatch(updateNavState(!isNavOpen));
        console.log("hamburger click");
      }}>
      <div className={`bar bar1 ${isNavOpen ? "moveDown" : ""}`}></div>
      <div className='bar bar2'></div>
      <div className={`bar bar3 ${isNavOpen ? "moveUp" : ""}`}></div>
    </button>
  );
}
