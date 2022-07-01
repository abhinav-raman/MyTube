import { useContext, useState } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

import Image from "next/image";
import Link from "next/link";
import rightArrowIcon from "../assets/images/right-arrow.svg";
import videoIcon from "../assets/images/video.svg";
import playlistIcon from "../assets/images/playlist.svg";
import accountIcon from "../assets/images/account.svg";
import { useRouter } from "next/router";

const Sidebar = () => {
	const router = useRouter();
	const { isExpanded, invertIsExpanded } = useContext(SideBarContext);
	return (
		<div
			className={`fixed min-h-screen mt-16 transition-all ${
				isExpanded ? "w-64" : "w-12"
			}`}
		>
			<div className="flex w-full justify-end items-center mb-6">
				<button
					className={`w-7 h-7 text-center bg-indigo-200 hover:bg-indigo-200/75 m-2 p-1 rounded-md shadow-lg shadow-indigo-300/20`}
					onClick={invertIsExpanded}
				>
					<Image
						className={`${isExpanded ? "rotate-180" : ""}`}
						src={rightArrowIcon}
						alt="arrow"
						layout="responsive"
					/>
				</button>
			</div>
			<ul>
				<li>
					<Link href="/">
						<a
							title="Videos"
							className={`flex p-2 hover:bg-indigo-200 hover:shadow-lg shadow-indigo-200/20 cursor-pointer rounded-r-lg ${
								router.asPath === "/" ? "bg-indigo-200 shadow-lg" : ""
							}`}
						>
							<div className="h-8 w-8 p-1">
								<Image
									src={videoIcon}
									layout="responsive"
									alt="video"
									className="fill-indigo-200"
								/>
							</div>
							{isExpanded && (
								<p className="ml-2 text-lg font-medium text-indigo-800">
									Videos
								</p>
							)}
						</a>
					</Link>
				</li>
				<li>
					<Link href="/playlists">
						<a
							title="Playlists"
							className={`flex p-2 hover:bg-indigo-200 hover:shadow-lg shadow-indigo-200/20 cursor-pointer rounded-r-lg ${
								router.asPath === "/playlists" ? "bg-indigo-200 shadow-lg" : ""
							}`}
						>
							<div className="h-8 w-8 p-1">
								<Image src={playlistIcon} layout="responsive" alt="video" />
							</div>
							{isExpanded && (
								<p className="ml-2 text-lg font-medium text-indigo-800">
									Playlists
								</p>
							)}
						</a>
					</Link>
				</li>
				<li>
					<Link href="/account">
						<a
							title="Account"
							className={`flex p-2 hover:bg-indigo-200 hover:shadow-lg shadow-indigo-200/20 cursor-pointer rounded-r-lg ${
								router.asPath === "/account" ? "bg-indigo-200 shadow-lg" : ""
							}`}
						>
							<div className="h-8 w-8 p-1">
								<Image src={accountIcon} layout="responsive" alt="video" />
							</div>
							{isExpanded && (
								<p className="ml-2 text-lg font-medium text-indigo-800">
									Account
								</p>
							)}
						</a>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
