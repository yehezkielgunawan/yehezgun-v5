import { z } from "zod";

export const contentDateSchema = z.iso.date();

export const externalUrlSchema = z.url({
	protocol: /^https?$/,
});
