import React from "react";

// Make this hook reusable
const useIsDark = () => {
	const [isDark, setIsDark] = React.useState<boolean>(false);

	React.useEffect(() => {
		localStorage.setItem("isDark", JSON.stringify(isDark));
	}, [isDark]);

	return { isDark, setIsDark };
};

export default useIsDark;
