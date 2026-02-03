import { useState, useEffect } from "preact/hooks";

export default function ProfileImage() {
  const [isAlternate, setIsAlternate] = useState(false);

  const handleClick = () => {
    setIsAlternate(true);
  };

  // Auto-revert after 2 seconds
  useEffect(() => {
    if (isAlternate) {
      const timer = setTimeout(() => {
        setIsAlternate(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAlternate]);

  // Listen for navigation events (link clicks)
  useEffect(() => {
    const handleNavigation = (e: Event) => {
      const target = e.target as HTMLElement;
      // Check if clicked element is a link
      const link = target.closest("a");
      if (link && link.href && !link.href.startsWith("mailto:")) {
        setIsAlternate(true);
      }
    };

    document.addEventListener("click", handleNavigation);
    return () => document.removeEventListener("click", handleNavigation);
  }, []);

  return (
    <div class="flex justify-center">
      <button
        onClick={handleClick}
        class="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Profile image - Click for surprise!"
        title="Click me! 😊"
      >
        <img
          src={
            isAlternate
              ? "/blog/images/profile2.jpg"
              : "/blog/images/profile.jpg"
          }
          alt="Profile"
          class={`w-full h-full object-cover transition-all duration-500 ${
            isAlternate ? "scale-110 rotate-6" : "scale-100 rotate-0"
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            if (target.parentElement) {
              target.parentElement.innerHTML =
                '<div class="w-full h-full flex items-center justify-center text-gray-400"><svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>';
            }
          }}
        />
      </button>
    </div>
  );
}
