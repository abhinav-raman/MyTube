import { useContext } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

import RightArrowIcon from "../assets/images/right-arrow.svg";
import VideoIcon from "../assets/images/video.svg";
import PlaylistIcon from "../assets/images/playlist.svg";
import AccountIcon from "../assets/images/account.svg";

import { PrimaryButton } from "./ui/Button";
import SideBarLink from "./ui/SideBarLink";

const Sidebar = () => {
	const { isExpanded, invertIsExpanded } = useContext(SideBarContext);
	return (
		<div
			className={`fixed min-h-screen mt-16 transition-all  ${
				isExpanded ? "w-64" : "w-12"
			}`}
		>
			<div className="flex w-full justify-end items-center my-3">
				<PrimaryButton
					onClickHandler={invertIsExpanded}
					applyClasses="aspect-square"
				>
					<RightArrowIcon
						className={`fill-white ${isExpanded ? "rotate-90" : "-rotate-90"}`}
					/>
				</PrimaryButton>
			</div>

			{/* Sidebar Links start
      each sidebar corresponds to existing page in the /pages to  */}

			<ul>
				<li>
					<SideBarLink href="/" title="Videos">
						<div className="h-8 w-8 p-1">
							<VideoIcon
								layout="responsive"
								alt="video"
								className="fill-sky-900 dark:fill-sky-200"
							/>
						</div>
						{isExpanded && <p className="ml-2 text-lg">Videos</p>}
					</SideBarLink>
				</li>

				<li>
					<SideBarLink href="/playlists" title="Playlists">
						<div className="h-8 w-8 p-1">
							<PlaylistIcon
								layout="responsive"
								alt="video"
								className="fill-sky-900 dark:fill-sky-200"
							/>
						</div>
						{isExpanded && <p className="ml-2 text-lg">Playlists</p>}
					</SideBarLink>
				</li>

				<li>
					<SideBarLink href="/account" title="Account">
						<div className="h-8 w-8 p-1">
							<AccountIcon
								layout="responsive"
								alt="video"
								className="fill-sky-900 dark:fill-sky-200"
							/>
						</div>
						{isExpanded && <p className="ml-2 text-lg">Account</p>}
					</SideBarLink>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
