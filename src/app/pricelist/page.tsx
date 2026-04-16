import GeneralWrapper from "@/components/GeneralWrapper";
import { metadataContent } from "@/services/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = metadataContent({
	title: "Pricelist",
	description: "Rate card and pricing for Yehezgun Corp educational services.",
	slug: "pricelist",
});

const services = [
	{
		name: "Guest Lecture Session",
		price: "500.000",
		unit: "per session",
		description:
			"A base guest lecture session covering topics in web development, frontend engineering, or software engineering (including AI Engineering) best practices.",
	},
];

const PricelistPage = () => {
	return (
		<GeneralWrapper>
			<section>
				<h1>Pricelist</h1>
				<p>
					<strong>Yehezgun Corp</strong> is my educational service provider
					focusing on software engineering and information systems. Below is our
					current rate card for my services.
				</p>
			</section>

			<section className="mt-12">
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
							<tr>
								<th>Service</th>
								<th>Description</th>
								<th>Rate (IDR)</th>
							</tr>
						</thead>
						<tbody>
							{services.map((service) => (
								<tr key={service.name}>
									<td className="font-semibold">{service.name}</td>
									<td>{service.description}</td>
									<td className="whitespace-nowrap">
										Rp {service.price} / {service.unit}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="mt-12">
				<div className="card bg-base-200">
					<div className="card-body">
						<h2 className="card-title">Notes</h2>
						<ul className="list-disc space-y-1 pl-5">
							<li>Prices are in Indonesian Rupiah (IDR).</li>
							<li>1 session is ~ 1-2 hours.</li>
							<li>
								Custom topics, sessions, or extended sessions can be arranged
								upon request.
							</li>
							<li>
								For offline sessions, especially outside of Jakarta or Bogor,
								additional travel expenses will be incurred and will be
								discussed upon request.
							</li>
							<li>
								For inquiries or bookings, reach out at{" "}
								<a
									href="mailto:yehezkiel.gunawan@yehezgun.com"
									className="link link-primary"
								>
									yehezkiel.gunawan@yehezgun.com
								</a>
								.
							</li>
						</ul>
					</div>
				</div>
			</section>
		</GeneralWrapper>
	);
};

export default PricelistPage;
