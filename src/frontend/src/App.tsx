import { useEffect } from "react";
import LoginScreen from "./components/LoginScreen";
import MainLayout from "./components/MainLayout";
import { useAuth } from "./hooks/useAuth";
import { useStudyStreak } from "./hooks/useStudyStreak";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme } = useTheme();
  const auth = useAuth();
  const { checkStreak } = useStudyStreak();

  useEffect(() => {
    checkStreak();
  }, [checkStreak]);

  // Apply theme class on mount
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  if (!auth.isAuthenticated) {
    return <LoginScreen auth={auth} />;
  }

  return <MainLayout auth={auth} />;
}
