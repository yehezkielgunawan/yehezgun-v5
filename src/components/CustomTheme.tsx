"use client";
import type {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from "react";
import SyntaxComponent from "./SyntaxComponent";
import ImageWithLightbox from "./ImageWithLightbox";

export const CustomTheme = {
  a: ({
    href,
    children,
  }: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >) => (
    <a
      href={href}
      className="link break-words hover:decoration-dashed hover:underline-offset-2"
      target={String(href).startsWith("http") ? "_blank" : "_self"}
      rel="noreferrer"
    >
      {children}
    </a>
  ),
  img: ({
    src,
    alt,
  }: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >) => <ImageWithLightbox src={src as string} alt={alt as string} />,

  code: (
    props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
  ) => <SyntaxComponent props={props} />,
  pre: (
    props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
  ) => <pre className="bg-transparent p-0">{props.children}</pre>,
};
