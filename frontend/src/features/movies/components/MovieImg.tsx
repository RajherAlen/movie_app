import clsx from 'clsx';

const MovieImg = ({ path, banner }: { path: string; banner?: boolean }) => {
    const posterUrl = 'https://image.tmdb.org/t/p/original';

    return (
        <img
            className={clsx(
                'absolute inset-0 h-full w-full rounded-2xl object-cover opacity-40 transition-all group-hover:scale-110 group-hover:opacity-90',
                banner ? 'lg:h-[160%]' : '',
            )}
            src={`${posterUrl}/${path}`}
            alt="poster image"
        />
    );
};

export default MovieImg;
