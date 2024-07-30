import { allQuickNotes } from "content-collections";

export const quickNotesList = allQuickNotes.map((note) => ({
	title: note.title,
	subtitle: note.subtitle,
	date: note.date,
	tags: note.tags,
	slug: note._meta.path,
}));

export const getQuickNoteBySlug = (slug: string) => {
	const note = allQuickNotes.find((note) => note._meta.path === slug);
	if (!note) {
		throw new Error(`No note found for slug: ${slug}`);
	}
	return note;
};

export const getQuickNotesMetadataBySlug = (slug: string) => {
	const note = allQuickNotes.find((note) => note._meta.path === slug);
	if (!note) {
		throw new Error(`No note found for slug: ${slug}`);
	}
	return {
		title: note.title,
		subtitle: note.subtitle,
	};
};
