import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Explore = ({name, link}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const  navigate = useNavigate();

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
    const handleClick = () => {
    navigate("/login", { state: { name, link } });
  };

    return (
        <div> 
            <button
            onClick={handleClick}
                
                ref={buttonRef}
                className="border border-white border-opacity-50 text-white bg-black 
                          px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 lg:px-8 lg:py-2.5 xl:px-10 xl:py-3 
                          rounded-full 
                          text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 
                          transition-all duration-200 ease-in-out
                          "
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {name}
            </button>
        </div>
    );
};

export default Explore;