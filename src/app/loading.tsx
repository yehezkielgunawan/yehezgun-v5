import GeneralWrapper from "@/components/GeneralWrapper";

const Loading = () => {
	return (
		<GeneralWrapper>
			<div className="skeleton h-12 w-full" data-testid="skeleton" />
			<div className="skeleton mt-6 h-12 w-full" data-testid="skeleton" />
			<div className="skeleton mt-6 h-12 w-full" data-testid="skeleton" />
		</GeneralWrapper>
	);
};

export default Loading;
