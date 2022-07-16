import Link from "next/link";
import { useRouter } from "next/router";

type SideBarLinkProps = {
	href: string;
	title: string;
	children: React.ReactNode;
};

const SideBarLink = ({ href, title, children }: SideBarLinkProps) => {
	const router = useRouter();

	return (
		<Link href={href}>
			<a
				title={title}
				className={`flex p-2 shadow-sky-800/20 cursor-pointer rounded-r-lg dark:text-white ${
					router.asPath === href
						? "font-semibold text-sky-800 bg-sky-200/50 dark:bg-sky-800/50"
						: "text-gray-700 hover:bg-slate-200 hover:dark:bg-gray-700"
				}`}
			>
				{children}
			</a>
		</Link>
	);
};

export default SideBarLink;
