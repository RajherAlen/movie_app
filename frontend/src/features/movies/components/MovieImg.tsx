import clsx from 'clsx';

interface MovieImgProps {
    fullHeight?: boolean;
    banner?: boolean;
    path: string;
}

const MovieImg = ({ fullHeight, path, banner }: MovieImgProps) => {
    const posterUrl = `https://image.tmdb.org/t/p/${banner ? "original" : "w342"}`;
    const isBanner = fullHeight ? 'h-full' : banner ? 'h-72' : '';

    return (
        <img
            className={clsx(
                'w-full object-cover opacity-40 transition-all group-hover:scale-105 group-hover:opacity-90',
                isBanner,
            )}
            loading="lazy"
            src={`${posterUrl}/${path}`}
            alt="poster image"
        />
    );
};

export default MovieImg;
