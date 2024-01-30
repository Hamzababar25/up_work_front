import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { MdMessage } from "react-icons/md";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        className="relative flex h-8 w-8 items-center text-gray-500 justify-center rounded-full border-[0.5px] border-gray-200 bg-gray-100 hover:text-gray-300 dark:border-gray-400 dark:bg-gray-600 dark:text-white"
        href="#"
      >
        <span
          className={`absolute -top-0.5 -right-0.5 z-10 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-10 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <MdMessage className="w-5 h-5 fill-current duration-300 ease-in-out" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 mt-2.5 flex h-72 w-72 z-40 flex-col rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-500 dark:bg-gray-600 sm:right-0 sm:w-80 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-gray-400">Messages</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex gap-4 border-t border-gray-200 px-4 py-3 hover:bg-gray-200 dark:border-gray-400 dark:hover:bg-gray-400"
              href="/messages"
            >
              <div className="h-12 w-12 rounded-full">
                <Image
                  width={112}
                  height={112}
                  src={"/inspection.jpg"}
                  alt="User"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  John
                </h6>
                <p className="text-sm text-gray-400">
                  I like your confidence 💪
                </p>
                <p className="text-xs text-gray-400">2min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  );
};

export default DropdownMessage;
