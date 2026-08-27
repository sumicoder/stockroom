import Link from 'next/link';
const Header = () => {
    return (
        <header className="bg-zinc-900 fixed top-0 left-0 w-full z-10">
            <h1 className="text-center p-2">
                <Link href="/" className="text-2xl font-bold">
                    Stockroom
                </Link>
            </h1>
        </header>
    );
};

export default Header;
