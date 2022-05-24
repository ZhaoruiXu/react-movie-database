export default function Loading() {
  const skeletonArr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className='skeleton-movies-container'>
      {skeletonArr.map(n => {
        return (
          <div className='skeleton-movie-card' key={n}>
            <div className='movie-poster'></div>

            <div className='movie-info'>
              <p className='movie-title'></p>
              <div className='movie-genre-container'></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
