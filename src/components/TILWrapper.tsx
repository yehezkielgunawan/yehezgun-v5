"use client";
import type React from "react";
import { useState } from "react";
import TILCard from "./TILCard";

type TILWrapperProps = {
	TILNoteList: {
		title: string;
		subtitle: string;
		tags: string[];
		slug: string;
	}[];
};

const TILWrapper = ({ TILNoteList }: TILWrapperProps) => {
	const [searchKeyword, setSearchKeyword] = useState<string>("");

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKeyword(e.target.value);
	};

	return (
		<>
			<input
				type="text"
				placeholder="Search Notes..."
				className="input input-bordered w-full rounded-lg border-2"
				onChange={handleChangeSearch}
			/>
			<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
				{TILNoteList.filter(
					(note) =>
						// filter based on title or tags
						note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
						note.tags.some((tag) =>
							tag.toLowerCase().includes(searchKeyword.toLowerCase()),
						),
				).map((note) => (
					<TILCard
						key={note.title}
						title={note.title}
						subtitle={note.subtitle}
						slug={note.slug}
						tags={note.tags}
					/>
				))}
			</div>
		</>
	);
};

export default TILWrapper;