import { BUTTON_PROPS } from ".";

const SecondaryButton = ({
	onClickHandler,
	children,
	applyClasses,
}: BUTTON_PROPS) => {
	return (
		<button
			className={`rounded-md bg-white dark:bg-gray-500 border border-gray-600 dark:text-white px-4 ${applyClasses}`}
			onClick={onClickHandler}
		>
			{children}
		</button>
	);
};

export default SecondaryButton;
