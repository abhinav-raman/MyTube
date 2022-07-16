import { BUTTON_PROPS } from ".";

const SecondaryButton = ({ onClickHandler, children }: BUTTON_PROPS) => {
	return (
		<button
			className="rounded-md bg-sky-100 border border-sky-400 px-4 py-2"
			onClick={onClickHandler}
		>
			{children}
		</button>
	);
};

export default SecondaryButton;
