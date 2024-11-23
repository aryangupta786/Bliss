import React, { useState } from "react";
import Profile from "./pages/profile";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiMessageSquare,
  FiHome,
  FiMonitor,
  FiGlobe,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { useTheme } from "./ThemeProvider"; 
import { Moon, Sun } from "lucide-react"; 
import { motion } from "framer-motion";

const NAVIGATION_ITEMS = [
  { icon: FiHome, title: "Home", path: "/" },
  { icon: FiMessageSquare, title: "Messages", path: "/messages", notifs: 3 },
  { icon: FiMonitor, title: "Create", path: "/create" },
  { icon: FiGlobe, title: "Community", path: "/community" },
  { icon: FiTag, title: "Notifications", path: "/notifications" },
  { icon: FiBarChart, title: "Analytics", path: "/analytics" },
  { icon: FiUsers, title: "Members", path: "/members" },
];

const sharedClasses = {
  sidebarButton: "relative flex h-10 w-full items-center rounded-md transition-colors",
  iconWrapper: "grid h-full w-10 place-content-center text-lg",
  hoverEffect: "hover:bg-slate-100 dark:hover:bg-slate-700",
};

const Nav = () => {
  return (
    <div className="flex bg-indigo-50 bg-white dark:bg-gray-800 text-black dark:text-white overflow-hidden">
      <Sidebar />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme, setTheme } = useTheme(); 

  const selected = NAVIGATION_ITEMS.find(item => item.path === currentPath)?.title || "Home";

  return (
    <motion.nav
      layout
      className={`
        sticky top-0 h-screen shrink-0
        border-r border-slate-300 dark:border-slate-700
        bg-white dark:bg-gray-800
        p-2 md:p-3 lg:p-4
        transition-all duration-300
        ${open ? "w-[225px] md:w-[250px]" : "w-16"}
      `}
    >
      <TitleSection open={open} />
      <div className="space-y-1">
        {NAVIGATION_ITEMS.map(({ icon: Icon, title, path, notifs }) => (
          <Option
            key={title}
            Icon={Icon}
            title={title}
            path={path}
            selected={selected}
            open={open}
            notifs={notifs}
          />
        ))}
      </div>
      <ToggleClose open={open} setOpen={setOpen} setTheme={setTheme} theme={theme} />
    </motion.nav>
  );
};

const TitleSection = ({ open }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    console.log("Logo clicked!"); 
    navigate("/Profile");
  };

  return (
    <div className="mb-3 border-b border-slate-300 dark:border-slate-700 pb-3">
      <div className="
        flex items-center justify-between
        rounded-md transition-all duration-300
        p-2 md:p-3
        hover:bg-slate-100 dark:hover:bg-slate-700
        group
      ">
        <div className="flex items-center gap-3">
          <div className="transform transition-transform group-hover:scale-105" onClick={handleLogoClick}>
            <Logo />
          </div>
          {open && (
            <motion.div
              layout
              className="flex flex-col space-y-0.5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs font-semibold tracking-wide">Admin</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Administrator</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Option = React.memo(({ Icon, title, path, selected, open, notifs }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      layout
      onClick={() => navigate(path)}
      role="menuitem"
      aria-label={title}
      aria-current={selected === title ? "page" : undefined}
      className={`${sharedClasses.sidebarButton} ${selected === title ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100" : "text-slate-500 dark:text-slate-300 " + sharedClasses.hoverEffect}`}
    >
      <motion.div layout className={sharedClasses.iconWrapper}>
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}
      {notifs && open && (
        <span
          aria-label={`${notifs} notifications`}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white flex items-center justify-center transform -translate-y-1/2"
        >
          {notifs}
        </span>
      )}
    </motion.button>
  );
});

const Logo = () => (
  <motion.div
    layout
    className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
  >
    <svg
      width="24"
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-slate-50"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      />
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      />
    </svg>
  </motion.div>
);

const ToggleClose = ({ open, setOpen, setTheme, theme }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-800 transition-colors duration-300">
      <motion.button
        layout
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="w-full p-2 md:p-3 flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
      >
        {theme === "light" ? <Moon className="h-5 w-5 text-slate-600" /> : <Sun className="h-5 w-5 text-slate-300" />}
        {open && (
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {theme === "light" ? "Dark mode" : "Light mode"}
          </span>
        )}
      </motion.button>
      <motion.button
        layout
        onClick={() => setOpen((pv) => !pv)}
        className="border-t border-slate-300 w-full transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700"
      >
        <div className="flex items-center p-2">
          <motion.div layout className="grid size-10 place-content-center text-lg">
            <FiChevronsRight className={`transition-transform ${open && "rotate-180"}`} />
          </motion.div>
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="text-xs font-medium"
            >
              Hide
            </motion.span>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default Nav;