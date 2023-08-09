import YouTube, { YouTubeProps } from 'react-youtube';

interface VideProps {
    videoId: string;
}

export const Video = ({ videoId }: VideProps) => {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: -1,
        },
    };

    return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
};

export default Video;
