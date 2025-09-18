import { useAuth0 } from "@auth0/auth0-react";

export default function SocialLoginButtons({ afterAuth }) {
  const { loginWithRedirect } = useAuth0();
  
  const handleGoogleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
        prompt: "consent select_account", // Force both consent and account selection
        max_age: 0, // Force fresh authentication
        screen_hint: "login", // Hint to show login screen
        scope: "openid profile email", // Explicit scope
        access_type: "offline" // Request refresh token
      }
    });
  };
  
  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-white border rounded py-2 font-medium hover:shadow"
      >Continue with Google</button>
    </div>
  );
}