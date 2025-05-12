export const allProjects = [
	{
		name: "Featured Project",
		description: "A featured project description",
		url: "https://test.com/featured",
		projectHero: "/test-hero.jpg",
		projectIcon: "/test-icon.jpg",
		stacks: ["React", "TypeScript"],
		date: "2024-03-20",
		isFeatured: true,
		content: "Project content",
		_meta: {
			filePath: "/featured.md",
			fileName: "featured",
			directory: "projects",
			path: "/projects/featured",
			extension: "md",
		},
	},
	{
		name: "Other Project",
		description: "A non-featured project description",
		url: "https://test.com/other",
		projectHero: "/test-hero.jpg",
		projectIcon: "/test-icon.jpg",
		stacks: ["Next.js", "Tailwind"],
		date: "2024-03-19",
		isFeatured: false,
		content: "Project content",
		_meta: {
			filePath: "/other.md",
			fileName: "other",
			directory: "projects",
			path: "/projects/other",
			extension: "md",
		},
	},
];

export const allWorkExperiences = [
	{
		company: "Test Company",
		title: "Senior Developer",
		startDate: "2020-01-01",
		endDate: "2024-03-20",
		description: "Test experience description",
		_meta: {
			filePath: "/experience.md",
			fileName: "experience",
			directory: "experiences",
			path: "/experiences/test",
			extension: "md",
		},
	},
];

export const allBlogs = [
	{
		title: "Test Blog Post",
		summary: "A test blog post summary",
		coverImg: "/test-cover.jpg",
		date: "2024-03-20",
		category: "Testing",
		_meta: {
			path: "test-blog",
		},
	},
];
