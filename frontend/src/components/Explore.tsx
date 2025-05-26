import { useRef } from 'react';

const Explore = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x / 2}px, ${y / 2}px)`;
    };

    const handleMouseLeave = () => {
        const button = buttonRef.current;
        if (button) button.style.transform = 'translate(0, 0)';
    };

    return (
        <div className="w-full flex justify-end"> {/* ✅ aligns button to the right */}
            <button
                ref={buttonRef}
                className="border border-white border-opacity-50 text-white bg-black px-6 py-2 rounded-full text-lg"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                Contact Us
            </button>
        </div>
    );
};

export default Explore;
