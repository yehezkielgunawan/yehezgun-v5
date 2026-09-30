import Figure from "@/components/Figure";
import GeneralWrapper from "@/components/GeneralWrapper";
import ImageWithLightbox from "@/components/ImageWithLightbox";
import TweetEmbed from "@/components/TweetEmbed";

export default function MediaPlaygroundPage() {
	return (
		<GeneralWrapper>
			<div className="mx-auto max-w-3xl">
				<header className="mb-10 border-base-content/15 border-b pb-8">
					<div className="flex flex-wrap items-center gap-3">
						<span className="badge badge-primary">Temporary QA page</span>
						<span className="font-mono text-base-content/60 text-xs uppercase tracking-[0.18em]">
							Media · 01
						</span>
					</div>
					<h1 className="mt-5 mb-3">Article media playground</h1>
					<p className="m-0 max-w-2xl text-base-content/70">
						Temporary visual checks for article images, figure captions,
						click-to-zoom, and X post embeds. Try both site themes and open each
						image with a click or keyboard activation.
					</p>
				</header>

				<section className="border-base-content/15 border-b py-8">
					<div className="grid gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
						<p className="m-0 font-mono text-base-content/55 text-xs uppercase tracking-[0.16em]">
							01 / Figure
						</p>
						<div>
							<h2 className="mt-0">Captioned diagram</h2>
							<p>
								The figure stays within the article column; zoom in to inspect
								the labels.
							</p>
							<Figure
								src="/blogs/what-i-learned-about-testing/pyramid-tradeoff.png"
								alt="Trade-offs between different software testing layers"
								width={1586}
								height={1274}
								caption="Testing Pyramid Trade-offs — click to inspect the details."
							/>
						</div>
					</div>
				</section>

				<section className="border-base-content/15 border-b py-8">
					<div className="grid gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
						<p className="m-0 font-mono text-base-content/55 text-xs uppercase tracking-[0.16em]">
							02 / Image
						</p>
						<div>
							<h2 className="mt-0">Small image</h2>
							<p>
								A small source should retain its natural size instead of being
								stretched to fill the article width.
							</p>
							<ImageWithLightbox
								src="/blogs/just-one-line/before.jpeg"
								alt="Small screenshot from before the fix"
								width={236}
								height={242}
							/>
						</div>
					</div>
				</section>

				<section className="py-8">
					<div className="grid gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
						<p className="m-0 font-mono text-base-content/55 text-xs uppercase tracking-[0.16em]">
							03 / X post
						</p>
						<div>
							<h2 className="mt-0">X embed</h2>
							<p>
								The post follows the selected site theme. If X no longer serves
								it, the embed should show a link to the original instead.
							</p>
							<TweetEmbed url="https://x.com/GergelyOrosz/status/1594612869085233153" />
						</div>
					</div>
				</section>
			</div>
		</GeneralWrapper>
	);
}
