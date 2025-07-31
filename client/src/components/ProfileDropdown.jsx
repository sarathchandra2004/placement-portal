import { useState, useRef, useEffect } from "react";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import "./ProfileDropdown.css"; // 👈 local CSS

const ProfileDropdown = () => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={menuRef}>
      <button
        className="dropdown-trigger"
        onClick={() => setOpen(!open)}
      >
        <FiUser className="dropdown-icon" />
      </button>

      {open && (
        <div className="dropdown-menu">
          <a
            href="/profile"
            className="dropdown-item"
            onClick={() => setOpen(false)}
          >
            Profile
          </a>
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="dropdown-item logout"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
