import Image from "next/image";

const YOUTUBE_VIDEO_WATCH_URL = `https://www.youtube.com/watch?v=`;
const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/`;

const VideoTile = ({
	videoId,
	videoData,
}: {
	videoId: string;
	videoData: any;
}) => {
	const {
		thumbnails: { medium },
	} = videoData;
	const loader = () => {
		return `${medium.url}?width=${medium.width}`;
	};
	return (
		<>
			<a
				className="cursor-pointer"
				target="_blank"
				rel="noreferrer"
				href={`${YOUTUBE_VIDEO_WATCH_URL}${videoId}`}
			>
				<div className="relative transition-all hover:scale-105">
					<Image
						src={medium.url}
						alt=""
						height={medium.height}
						width={medium.width}
            layout="responsive"
						className="rounded-t-lg border-0"
					/>
				</div>
				<h4
					className="font-bold line-clamp-2 px-2 py-1"
					title={videoData.title}
				>
					{videoData.title}
				</h4>
			</a>
			<a
				href={`${YOUTUBE_CHANNEL_URL}${videoData.channelId}`}
				target="_blank"
				rel="noreferrer"
			>
				<p title={videoData.channelTitle} className="p-2">
					{videoData.channelTitle}
				</p>
			</a>
		</>
	);
};

export default VideoTile;
