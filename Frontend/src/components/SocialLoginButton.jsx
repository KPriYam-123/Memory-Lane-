import { useAuth0 } from "@auth0/auth0-react";

export default function SocialLoginButtons({ afterAuth }) {
  const { loginWithRedirect } = useAuth0();
  const base = {
    redirectUri: `${window.location.origin}/home`,
    scope: "openid profile email"
  };
  return (
    <div className="space-y-3">
      <button
        onClick={() => loginWithRedirect({ ...base, connection: "google-oauth2" })}
        className="w-full bg-white border rounded py-2 font-medium hover:shadow"
      >Continue with Google</button>
      </div>
    );
  }