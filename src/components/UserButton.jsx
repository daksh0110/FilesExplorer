import styled from "styled-components";
import { useAuth } from "../AuthContext";
import { useState, useEffect, useRef } from "react";
import { userProfile } from "./UserData";

// Styled components
const DropdownContainer = styled.div`
  display: inline-block;
  position: relative;
  border-radius: 20px;
  margin-top: 0.7rem;
  height: 3rem;
  width: 6rem; /* Reduced width of the dropdown container */
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer; // Change cursor to pointer
  height: 100%; // Ensure the button takes the full height
  display: flex; // Align items in a row
  align-items: center; // Center vertically
  justify-content: center; // Center horizontally
`;

const DropdownMenu = styled.div`
  background-color: #f9f9f9;
  position: absolute;
  width: 100%; // Match dropdown width with the button
  z-index: 1;
  border-radius: 0 0 10px 10px; // Round corners at the bottom
  max-height: 200px; // Limit the height of the dropdown
  overflow-y: auto; // Enable vertical scrolling if necessary
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center; // Center the image in the button
  font-size: xx-small;

  img {
    border-radius: 50%;
    width: 50%; // Adjust image size to make it larger
    height: auto; // Maintain aspect ratio
  }
`;

// Main component
export default function UserButton() {
  const { isLoggedIn, user, login, logout } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown

  // Fetch user data
  useEffect(() => {
    if (isLoggedIn && user) {
      fetchData();
    }
  }, [isLoggedIn, user]);

  async function fetchData() {
    setUserInfo((await userProfile(user)) || {});
  }

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleMenu}>
        <UserInfo>
          <img
            src={userInfo?.picture}
            referrerPolicy="no-referrer"
            alt={userInfo?.name}
          />
        </UserInfo>
      </DropdownButton>
      {menuVisible && (
        <DropdownMenu>
          <ul>
            <li onClick={logout}>Logout</li>
            {/* Add more options here if needed */}
          </ul>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}
