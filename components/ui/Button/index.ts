import PrimaryButton from "./Primary";
import SecondaryButton from "./Secondary";
import ThemeButton from "./Theme";

export type BUTTON_PROPS = {
	onClickHandler: () => void;
	children?: React.ReactNode;
  applyClasses?: string;
};

export { PrimaryButton, SecondaryButton, ThemeButton };
