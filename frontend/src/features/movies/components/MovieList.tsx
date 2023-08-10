import { MovieCard } from '.';
import { MovieProps } from '../model/Movie';

interface MovieListProps {
    isLoading: boolean;
    movieList: MovieProps[];
    movieNumber?: number;
    title: string;
}

const MovieList = (props: MovieListProps) => {
    const setMovieNumber = props.movieNumber ? props.movieNumber : props.movieList.length;
    
    return (
        <div className='mb-10'>
            <h1 className="mb-6 text-lg font-bold text-slate-300">
                {props.title}
            </h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {!props.isLoading
                    ? props.movieList?.slice(0, setMovieNumber).map((movie) => {
                          return (
                              <MovieCard
                                  movie={movie}
                                  key={movie.id}
                                  isLoading={props.isLoading}
                              />
                          );
                      })
                    : Array.from({ length: setMovieNumber }, (_, index) => (
                          <div
                              className="w-full rounded-2xl shadow"
                              key={index}
                          >
                              <div
                                  className={`h-52 w-full animate-pulse rounded-2xl bg-slate-800`}
                              ></div>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default MovieList;
