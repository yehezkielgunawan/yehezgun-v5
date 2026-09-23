import { allQuickNotes } from "content-collections";
import { compareDatesDescending } from "@/services/formatDate";

export const quickNotesList = allQuickNotes
	.map((note) => ({
		title: note.title,
		subtitle: note.subtitle,
		date: note.date,
		tags: note.tags,
		slug: note._meta.path,
	}))
	.sort((firstNote, secondNote) =>
		compareDatesDescending(
			firstNote.date,
			secondNote.date,
			firstNote.slug,
			secondNote.slug,
		),
	);

export const getQuickNoteBySlug = (slug: string) => {
	return allQuickNotes.find((note) => note._meta.path === slug);
};
