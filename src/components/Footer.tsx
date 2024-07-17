const Footer = () => {
	return (
		<footer className="container mx-auto mt-16 text-center">
			<a
				href="https://yehezgun.com"
				target="_blank"
				className="link link-hover"
				rel="noreferrer"
			>
				© {new Date().getFullYear()} | Yehezgun
			</a>
		</footer>
	);
};

export default Footer;
