import Image from "next/image";
import DeleteIcon from "../../assets/images/delete-icon.svg";

const YOUTUBE_VIDEO_WATCH_URL = `https://www.youtube.com/watch?v=`;
const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/`;

const VideoTileUser = ({
	videoId,
	videoData,
  deleteVideoHandler
}: {
	videoId: string;
	videoData: any;
  deleteVideoHandler: (videoId: string) => void;
}) => {
	const {
		thumbnails: { medium },
	} = videoData;

	return (
		<div className="bg-gray-100 dark:bg-gray-700 dark:text-white m-2 rounded-lg transition-all hover:scale-105">
			<a
				className="cursor-pointer"
				target="_blank"
				rel="noreferrer"
				href={`${YOUTUBE_VIDEO_WATCH_URL}${videoId}`}
        >
          
				<div className="relative">
					<Image
						src={medium.url}
						alt=""
						height={medium.height}
						width={medium.width}
						layout="responsive"
						className="rounded-t-lg border-0"
					/>
				</div>
				<div className="flex justify-between">
					<h4
						className="font-medium line-clamp-2 px-2 py-1"
						title={videoData.title}
					>
						{videoData.title}
					</h4>
					<div className="h-8 w-8 py-1">
						<DeleteIcon
							className="h-6 w-6 m-auto fill-black dark:fill-white hover:fill-red-400 hover:dark:fill-red-400"
							onClick={(e: any) => {
                e.preventDefault();
                deleteVideoHandler(videoId);
              }}
						/>
					</div>
				</div>
			</a>
			<a
				href={`${YOUTUBE_CHANNEL_URL}${videoData.channelId}`}
				target="_blank"
				rel="noreferrer"
			>
				<p title={videoData.channelTitle} className="p-2 dark:text-gray-300">
					{videoData.channelTitle}
				</p>
			</a>
		</div>
	);
};

export default VideoTileUser;
