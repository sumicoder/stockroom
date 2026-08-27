const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-zinc-900 fixed bottom-0 left-0 w-full z-10">
            <p className="text-center p-2">
                &copy; {year} Stockroom. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
