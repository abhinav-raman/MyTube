import Image from "next/image";
import openIcon from "../assets/images/open-playlist.png";

const YOUTUBE_PLAYLIST_URL = `https://www.youtube.com/playlist?list=`;
const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/`;

const PlaylistTile = ({
	playlistId,
	playlistData,
}: {
	playlistId: string;
	playlistData: any;
}) => {
	const {
		thumbnails: { medium },
	} = playlistData;

	const loader = () => {
		return `${medium.url}?width=${medium.width}`;
	};

	return (
		<>
			<a
				className="cursor-pointer"
				target="_blank"
				rel="noreferrer"
				href={`${YOUTUBE_PLAYLIST_URL}${playlistId}`}
			>
				<div className="border b-slate-600 relative">
					<Image
						className="transition-all hover:scale-105"
						src={medium.url}
						alt=""
						loader={loader}
						layout="responsive"
						height={medium.height}
						width={medium.width}
					/>
					<div className="absolute h-8 w-full bottom-0 bg-black/[0.4] ">
            <p className="w-full text-center text-white my-1">Open Playlist</p>
					</div>
				</div>
				<h4 className="font-bold line-clamp-2" title={playlistData.title}>
					{playlistData.title}
				</h4>
			</a>
			<a
				href={`${YOUTUBE_CHANNEL_URL}${playlistData.channelId}`}
				target="_blank"
				rel="noreferrer"
			>
				<p title={playlistData.channelTitle}>{playlistData.channelTitle}</p>
			</a>
		</>
	);
};

export default PlaylistTile;
