import { formatDate } from "@/services/formatDate";

type ExperienceCardProps = {
	company: string;
	role: string;
	startDate: string;
	endDate?: string;
};

const ExperienceCard = (props: ExperienceCardProps) => {
	return (
		<div className="space-y-1 rounded-lg bg-base-200 p-2">
			<h5 className="m-0 font-semibold">{props.company}</h5>
			<p className="m-0">{props.role}</p>
			<p className="m-0 font-semibold text-sm italic">
				{formatDate(props.startDate, {
					month: "short",
					year: "numeric",
				})}{" "}
				-{" "}
				{props.endDate
					? formatDate(props.endDate, {
							month: "short",
							year: "numeric",
						})
					: "Now"}
			</p>
		</div>
	);
};

export default ExperienceCard;
