import MovieCard from "./MovieCard";

export default function Movies({ moviesData }) {
  console.log("haha", moviesData);
  return (
    <div className='movies-container'>
      {moviesData &&
        moviesData.map(movieData => {
          return <MovieCard key={movieData.id} movieId={movieData.id} />;
        })}
    </div>
  );
}
