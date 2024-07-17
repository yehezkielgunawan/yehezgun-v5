export default function Home() {
	return (
		<main>
			<article className="prose lg:prose-lg max-w-none">
				<h1>Hello world!</h1>
				<code>
					This is just a starter template, made using Next.js app dir +
					Typescript + Tailwind CSS (with Daisy UI).
				</code>
				<div className="mt-12 flex w-full items-center justify-center">
					<a
						href="https://github.com/new?template_name=next14-starter&template_owner=yehezkielgunawan"
						target="_blank"
						className="btn"
						rel="noreferrer"
					>
						Generate Project using this template
					</a>
				</div>
			</article>
		</main>
	);
}
