import { allTilNotes } from "content-collections";

export const allTILNotes = allTilNotes.map((note) => ({
	title: note.title,
	subtitle: note.subtitle,
	date: note.date,
	tags: note.tags,
	slug: note._meta.path,
}));
