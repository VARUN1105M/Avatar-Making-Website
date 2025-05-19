import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/Supabase";

export default function MagicRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleMagicLink() {
      const url = window.location.href;
      const hasAccessToken = url.includes('access_token=');
      if (hasAccessToken) {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');
        if (access_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          if (error) {
            console.error("Error setting session:", error.message);
            navigate("/login");
            return;
          }
          navigate("/home");
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    }

    handleMagicLink();
  }, [navigate]);

  return <p>Loading...</p>;
}
