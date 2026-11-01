import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import i18n from "src/shared/utils/i18n";
import { changeLocale } from "src/shared/utils/locale";
import { setLanguageFonts } from "src/shared/utils/font";
import { useNavigate } from "react-router-dom";
import { TOP_LINKS } from "../../constants";

export function EnhancedNavHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("en");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = () => {
    setLanguage(language === "en" ? "km" : "en");
    const currentLang = i18n.language;
    const newLang = currentLang === "en" ? "km" : "en";
    changeLocale(newLang);
    setLanguageFonts(newLang);
  };

  const handleNavigation = (href: string): void => {
    Navigate(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? // "bg-black/80 backdrop-blur-2xl border-b border-purple-500/30 shadow-2xl shadow-purple-500/10"
            "bg-black/20 backdrop-blur-xl"
          : "bg-black/20 backdrop-blur-xl"
      }`}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-18">
          {/* Logo Section */}
          <div className="flex items-center group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-xl blur-sm opacity-0"></div>

              <div className="relative flex items-center space-x-1 px-4 py-2">
                <div className="relative">
                  <div className="w-13 h-13 flex items-center justify-center">
                    <img
                      className="rounded"
                      src="/assets/icon/sticker.webp"
                      alt=""
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                    Vanneth Tak
                  </span>
                  <span className="text-xs ps-1 text-gray-400">
                    Full-Stack Developer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {TOP_LINKS.map((link) => (
              <div key={link.name} className="relative group">
                <button
                  onClick={() => {
                    if (link.hasDropdown) {
                      setActiveDropdown(
                        activeDropdown === link.name ? null : link.name,
                      );
                    } else {
                      handleNavigation(link.href);
                    }
                  }}
                  className="group/btn relative px-6 py-3 text-sm font-medium transition-all duration-300 hover:text-purple-400 text-white hover:scale-105 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-pink-500/10 hover:to-blue-500/10 hover:shadow-lg hover:shadow-purple-500/20 flex items-center space-x-1"
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
                  )}

                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover/btn:w-4/5"></div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Dropdown Menu */}
                {link.hasDropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden">
                    <div className="py-2">
                      {link.dropdownItems?.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => handleNavigation(item.href)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 hover:translate-x-1"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Language Switcher */}
            <button
              onClick={handleLanguageChange}
              className="group relative ml-4 px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-purple-400 text-white hover:scale-105 bg-black/30 backdrop-blur-xl border border-purple-500/40 rounded-xl hover:bg-black/50 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/30 flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span className="font-semibold">
                {language === "en" ? "English" : "ភាសាខ្មែរ"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group relative p-3 text-white hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:scale-110"
            >
              <div className="relative">
                {mobileMenuOpen ? (
                  <X
                    size={24}
                    className="transition-transform duration-300 rotate-90"
                  />
                ) : (
                  <Menu
                    size={24}
                    className="transition-transform duration-300"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            mobileMenuOpen
              ? "max-h-screen opacity-100 pb-6"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl mt-4 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
            <div className="p-6 space-y-4">
              <button
                onClick={handleLanguageChange}
                className="group w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300 hover:text-purple-400 text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 rounded-xl flex items-center space-x-3"
              >
                <span>{language === "en" ? "English" : "ភាសាខ្មែរ"}</span>
              </button>

              {TOP_LINKS.map((link) => (
                <div key={link.name} className="space-y-2">
                  <button
                    onClick={() => {
                      if (link.hasDropdown) {
                        setActiveDropdown(
                          activeDropdown === link.name ? null : link.name,
                        );
                      } else {
                        handleNavigation(link.href);
                      }
                    }}
                    className="group w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300 hover:text-purple-400 text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 rounded-xl flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {link.hasDropdown && activeDropdown === link.name && (
                    <div className="ml-4 space-y-1">
                      {link.dropdownItems?.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => handleNavigation(item.href)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 rounded-lg"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-8 right-1/3 w-1 h-1 bg-pink-400 rounded-full opacity-30"></div>
        <div className="absolute bottom-4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-25"></div>
      </div>
    </nav>
  );
}
