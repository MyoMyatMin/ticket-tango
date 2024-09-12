import Movies from "@/components/Movies";
import QuickSearch from "@/components/QuickSearch";

export default function Home() {
  return (
    <div>
      <QuickSearch />
      <hr className="mx-8" />
      <Movies />
    </div>
  );
}
