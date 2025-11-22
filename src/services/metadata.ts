import type { Metadata } from "next";

type OGImageProps = {
  title: string;
  description: string;
  slug?: string;
  type?: "website" | "article";
};

export function generateOGImage({ title, description }: OGImageProps) {
  return `https://og-image.yehezgun.com/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&siteName=yehezgun.com&social=Twitter:%20@yehezgun`;
}

export const metadataContent = ({
  title,
  description,
  slug,
  type = "website",
}: OGImageProps): Metadata => ({
  title,
  description,
  authors: [{ name: "Yehezkiel Gunawan", url: "https://yehezgun.com" }],
  category: "personal",
  manifest: "/manifest.json",
  icons: {
    icon: ["/yehez-icon.svg"],
    shortcut: ["/yehez-icon.svg"],
    apple: ["/yehez-icon.svg"],
    other: {
      rel: "icon",
      url: "/yehez-icon.svg",
    },
  },
  openGraph: {
    type,
    siteName: "YehezGun",
    url: `https://yehezgun.com${slug ? `/${slug}` : ""}`,
    title,
    description,
    images: [
      {
        url: generateOGImage({
          title,
          description,
        }),
        secureUrl: generateOGImage({
          title,
          description,
        }),
        width: 1200,
        height: 627,
        alt: title,
        type: "image/png",
      },
    ],
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    site: "@yehezgun",
    creator: "@yehezgun",
    images: [
      generateOGImage({
        title,
        description,
      }),
    ],
  },
});
