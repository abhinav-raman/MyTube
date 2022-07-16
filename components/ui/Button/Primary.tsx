import { BUTTON_PROPS } from ".";

const PrimaryButton = ({
	applyClasses,
	onClickHandler,
	children,
}: BUTTON_PROPS) => {
	return (
		<button
			className={`px-2 rounded-md bg-sky-600 hover:bg-sky-600/75 text-white shadow-lg ${applyClasses}`}
			onClick={onClickHandler}
		>
			{children}
		</button>
	);
};

export default PrimaryButton;
