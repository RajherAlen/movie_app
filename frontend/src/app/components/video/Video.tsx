import YouTube, { YouTubeProps } from 'react-youtube';

interface VideProps {
    videoId: string;
    autoPlay?: boolean;
}

export const Video = ({ videoId, autoPlay }: VideProps) => {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target

        if(autoPlay) {
            event.target.playVideo();
        } else {
            event.target.pauseVideo();
        }
    };

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: autoPlay ? 0 : -1,
        },
    };

    return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
};

export default Video;
