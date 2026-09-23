import { describe, expect, it } from "vitest";
import * as quickNotesService from "@/services/quickNotes";

describe("QuickNotes Service", () => {
	describe("quickNotesList", () => {
		it("should return quick notes list with the correct structure", () => {
			const quickNotesList = quickNotesService.quickNotesList;

			// Verify the structure, not the exact test data
			expect(Array.isArray(quickNotesList)).toBe(true);

			expect(quickNotesList.length).toBeGreaterThan(0);

			const firstNote = quickNotesList[0];
			expect(firstNote).toHaveProperty("title");
			expect(firstNote).toHaveProperty("subtitle");
			expect(firstNote).toHaveProperty("date");
			expect(firstNote).toHaveProperty("tags");
			expect(firstNote).toHaveProperty("slug");
		});
	});

	describe("getQuickNoteBySlug", () => {
		it("should return undefined if quick note is not found", () => {
			expect(
				quickNotesService.getQuickNoteBySlug("non-existent-note"),
			).toBeUndefined();
		});

		it("should return a quick note by slug if one exists", () => {
			const quickNotesList = quickNotesService.quickNotesList;

			expect(quickNotesList.length).toBeGreaterThan(0);
			const testSlug = quickNotesList[0].slug;

			const note = quickNotesService.getQuickNoteBySlug(testSlug);
			expect(note).toHaveProperty("title");
			expect(note).toHaveProperty("content");
		});
	});
});
