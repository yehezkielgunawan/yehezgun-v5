import Link from "next/link";

type QuickNotesProps = {
	slug: string;
	title: string;
	subtitle: string;
	tags: string[];
};

const QuickNotesCard = (til: QuickNotesProps) => {
	return (
		<Link
			href={`/til/${til.slug}`}
			className="group hover:-translate-y-0.5 rounded-lg bg-base-300 no-underline transition duration-300 hover:underline hover:shadow-md dark:hover:shadow-neutral-content"
		>
			<div className="flex h-full w-full flex-col items-start justify-between rounded-lg p-2">
				<div className="space-y-2">
					<h5 className="font-semibold">{til.title}</h5>
					<p className="text-sm">{til.subtitle}</p>
				</div>
				<div className="flex items-center gap-2">
					{til.tags.map((tag) => (
						<p key={tag} className="badge badge-neutral">
							{tag}
						</p>
					))}
				</div>
			</div>
		</Link>
	);
};

export default QuickNotesCard;
