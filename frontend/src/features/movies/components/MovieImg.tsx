const MovieImg = ({ path }: { path: string }) => {
    const posterUrl = 'https://image.tmdb.org/t/p/original';

    return (
        <img
            className="absolute inset-0 rounded-2xl opacity-40 transition-all group-hover:opacity-90 group-hover:scale-110"
            src={`${posterUrl}/${path}`}
            alt="poster image"
        />
    );
};

export default MovieImg;
