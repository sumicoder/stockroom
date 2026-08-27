import Link from 'next/link';

export default function Home() {
    const projects = [
        {
            id: 'solar-system',
            title: '太陽系シミュレーション',
            description: 'Three.jsを使用した3D太陽系の可視化',
            href: '/solar-system',
        },
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        href={project.href}
                        className="group rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <h2 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-50 dark:group-hover:text-zinc-300">{project.title}</h2>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
