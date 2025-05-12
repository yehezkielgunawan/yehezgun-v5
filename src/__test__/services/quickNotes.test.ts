import { describe, it, expect } from "vitest";
import * as quickNotesService from "@/services/quickNotes";

describe("QuickNotes Service", () => {
	describe("quickNotesList", () => {
		it("should return quick notes list with the correct structure", () => {
			const quickNotesList = quickNotesService.quickNotesList;

			// Verify the structure, not the exact test data
			expect(Array.isArray(quickNotesList)).toBe(true);

			// Only run further tests if there are quick notes
			if (quickNotesList.length > 0) {
				// Check the structure of a quick note
				const firstNote = quickNotesList[0];
				expect(firstNote).toHaveProperty("title");
				expect(firstNote).toHaveProperty("subtitle");
				expect(firstNote).toHaveProperty("date");
				expect(firstNote).toHaveProperty("tags");
				expect(firstNote).toHaveProperty("slug");
			}
		});
	});

	describe("getQuickNoteBySlug", () => {
		it("should throw an error if quick note is not found", () => {
			expect(() =>
				quickNotesService.getQuickNoteBySlug("non-existent-note"),
			).toThrow("No note found for slug: non-existent-note");
		});

		it("should return a quick note by slug if one exists", () => {
			const quickNotesList = quickNotesService.quickNotesList;

			// Only run the test if there are quick notes
			if (quickNotesList.length > 0) {
				const testSlug = quickNotesList[0].slug;

				const note = quickNotesService.getQuickNoteBySlug(testSlug);
				expect(note).toHaveProperty("title");
				expect(note).toHaveProperty("content");
			} else {
				// Skip test if no notes exist
				console.log("Skipping quick note test - no notes exist");
			}
		});
	});

	describe("getQuickNotesMetadataBySlug", () => {
		it("should throw an error if quick note is not found", () => {
			expect(() =>
				quickNotesService.getQuickNotesMetadataBySlug("non-existent-note"),
			).toThrow("No note found for slug: non-existent-note");
		});

		it("should return quick note metadata by slug if one exists", () => {
			const quickNotesList = quickNotesService.quickNotesList;

			// Only run the test if there are quick notes
			if (quickNotesList.length > 0) {
				const testSlug = quickNotesList[0].slug;

				const metadata =
					quickNotesService.getQuickNotesMetadataBySlug(testSlug);
				expect(metadata).toHaveProperty("title");
				expect(metadata).toHaveProperty("subtitle");
			} else {
				// Skip test if no notes exist
				console.log("Skipping quick note metadata test - no notes exist");
			}
		});
	});
});
