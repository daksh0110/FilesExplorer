import { useAuth } from "./AuthContext";
import Drives from "./components/Drives";
import NewLayout from "./components/NewLayout";
import ContentPage from "./ContentPage";

export default function Home() {
  const { isSearching } = useAuth();
  if (isSearching) {
    return <ContentPage />;
  }
  return <Drives />;
}
