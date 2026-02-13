import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/authStore";


export default function App() {
  const user = useAuthStore((state) => state.user);

  return user ? <Dashboard /> : <SignIn />;
}
