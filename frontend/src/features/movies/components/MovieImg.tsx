import clsx from 'clsx';

interface MovieImgProps {
    fullHeight?: boolean;
    banner?: boolean;
    path: string;
}

const MovieImg = ({ fullHeight, path, banner }: MovieImgProps) => {
    const posterUrl = `https://image.tmdb.org/t/p/${banner ? 'original' : 'w342'}`;
    const isBanner = fullHeight ? 'h-full' : banner ? 'h-72' : 'min-h-340';

    return (
        <div className={clsx(
            'relative',
            !banner ? 'min-h-340' : ''
        )}>
            <img
                className={clsx(
                    isBanner,
                    'w-full object-cover opacity-40 transition-all group-hover:opacity-90',
                )}
                loading="lazy"
                src={`${posterUrl}/${path}`}
                alt="poster image"
            />
        </div>
    );
};

export default MovieImg;
