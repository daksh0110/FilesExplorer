import { googleLogout } from "@react-oauth/google";

export default function GoogleLogoutButton() {
  const handleLogout = () => {
    googleLogout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}
