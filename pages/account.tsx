import type { NextPage } from "next";
import { useContext } from "react";
import { SideBarContext } from "../context/SidebarStateContext";

const Account: NextPage = () => {
  const { isExpanded } = useContext(SideBarContext);
	return (
		<main className={`pt-12 transition-all ${isExpanded ? "ml-72" : "ml-12"}`}>
			Account
		</main>
	);
}

export default Account;