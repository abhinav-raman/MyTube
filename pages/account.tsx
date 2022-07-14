import type { User } from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../context/SidebarStateContext";
import { currentSignedInUser } from "../firebase/firebase-auth";

const Account: NextPage = () => {
	const { isExpanded } = useContext(SideBarContext);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		currentSignedInUser((user: User) => {
			console.log(user);

			if (!user) {
				router.replace("/login");
			}
			setCurrentUser(user);
		});
	}, [router]);

	return (
		<>
			<Head>
				<title>MyTube | Account</title>
			</Head>
			<main
				className={`h-full p-2 pt-[4.5rem] transition-all ${
					isExpanded ? "ml-64" : "ml-12"
				}`}
			>
				<div className="h-8 flex justify-between mb-4 mx-2">
					<h2 className="text-2xl font-bold text-yellow-800">Account</h2>
				</div>
				{currentUser && (
					<section>
						<div className="w-full">
							<div className="relative h-32 aspect-square m-auto">
								<Image
									src={currentUser.photoURL || ""}
									alt="profile"
									layout="fill"
									className="absolute rounded-full"
								/>
							</div>
							<div className="w-full">
								<h2 className="text-2xl text-center font-bold text-yellow-600 mb-2">
									{currentUser.displayName}
								</h2>
								<h4 className="text-xl text-center font-semibold text-yellow-600/75">
									{currentUser.email}
								</h4>
							</div>
						</div>
					</section>
				)}
        <div className="h-8 flex justify-between mb-4 mx-2">
					<h2 className="text-2xl font-bold text-yellow-800">Your Videos</h2>
				</div>
			</main>
		</>
	);
};

export default Account;
