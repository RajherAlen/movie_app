import ModeToggle from 'components/dropdown/ModeToggle';

const MainHeader = () => {
    return (
        <header className="body-font w-full border-b border-slate-800 px-6 py-4 text-gray-600">
            <ModeToggle />
        </header>
    );
};

export default MainHeader;
