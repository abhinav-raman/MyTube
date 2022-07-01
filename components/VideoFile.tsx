import Image from "next/image";

const YOUTUBE_VIDEO_WATCH_URL = `https://www.youtube.com/watch?v=`;

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
		<a
			className="cursor-pointer"
			target="_blank"
			rel="noreferrer"
			href={`${YOUTUBE_VIDEO_WATCH_URL}${videoId}`}
		>
			<div className="border b-slate-600 relative">
				<Image
					src={medium.url}
					alt=""
					loader={loader}
					layout="responsive"
					height={medium.height}
					width={medium.width}
				/>
			</div>
			<h4 className="font-bold line-clamp-2" title={videoData.title}>
				{videoData.title}
			</h4>
			<p title={videoData.channelTitle}>{videoData.channelTitle}</p>
		</a>
	);
};

export default VideoTile;