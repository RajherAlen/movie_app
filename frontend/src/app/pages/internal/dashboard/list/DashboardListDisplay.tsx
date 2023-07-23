import Select from 'components/select/Select';
import { useGetPlayingNowMoviesQuery } from 'features/movies/api/movieApiSlice';
import { MovieCard } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';
import { useEffect, useState } from 'react';

const DashboardListDisplay = () => {
    const { data, isLoading } = useGetPlayingNowMoviesQuery();
    const [movieList, setMovieList] = useState<MovieProps[]>([]);

    useEffect(() => {
        if (data) {
            setMovieList(data.results);
        }
    }, [data, isLoading]);

    return (
        <>
            <div className="mb-5">
                <Select
                    label="Select genres"
                    placeholder="Genres"
                    options={[
                        { value: 'Commedy', id: 123 },
                        { value: 'horror', id: 12421 },
                    ]}
                />
            </div>

            <div className="mb-6">
                <MovieCard banner={true} movie={movieList[0]} isLoading={isLoading} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {!isLoading
                    ? movieList?.map((movie) => {
                          return (
                              <MovieCard
                                  movie={movie}
                                  key={movie.id}
                                  isLoading={isLoading}
                              />
                          );
                      })
                    : Array.from({ length: 10 }, (_, index) => (
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
        </>
    );
};

export default DashboardListDisplay;
