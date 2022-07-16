import { useRouter } from "next/router";
import BackIcon from "../../../assets/images/back-arrow.svg";

const BackArrow = () => {

  const router = useRouter();

	return (
		<button className="h-full aspect-square" onClick={() => router.back()}>
			<BackIcon
				alt="back"
				layout="responsive"
				className="hover:-translate-x-1 transition-all dark:fill-white"
			/>
		</button>
	);
};

export default BackArrow;
