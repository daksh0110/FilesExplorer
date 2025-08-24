import { useGoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      localStorage.setItem("token", tokenResponse.access_token);
    },
  });

  return <button onClick={() => login()}>Sign in with Google 🚀</button>;
}
