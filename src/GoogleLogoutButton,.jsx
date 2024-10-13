import { googleLogout } from "@react-oauth/google";

export default function GoogleLogoutButton() {
  return <button onClick={googleLogout()}>Logout</button>;
}
