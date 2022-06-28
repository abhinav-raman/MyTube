const Header = () => {
	return (
		<header className="fixed flex justify-center w-full h-12 bg-amber-400 border-b-2 border-b-amber-600">
			<h1 className="text-3xl font-bold">Mytube</h1>
			<div className="h-full absolute right-2">
				<button className="h-8 my-2 px-2 rounded-md border-2 border-amber-600 hover:border-amber-200">
					Login
				</button>
			</div>
		</header>
	);
};

export default Header;
