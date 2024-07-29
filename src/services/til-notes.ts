import { allTilNotes } from "content-collections";

export const allTILNotes = allTilNotes.map((note) => ({
	title: note.title,
	subtitle: note.subtitle,
	date: note.date,
	tags: note.tags,
	slug: note._meta.path,
}));

export const getTILNoteBySlug = (slug: string) => {
	const note = allTilNotes.find((note) => note._meta.path === slug);
	if (!note) {
		throw new Error(`No note found for slug: ${slug}`);
	}
	return note;
};
