import { fetchInterns } from "@/actions/userActions";
import InternCard from "@/components/ui/intern-card";

async function InternsPage() {
  const { interns = [] } = await fetchInterns({
    page: 1,
    limit: 10,
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full">
      {interns.map((intern) => (
        <InternCard key={intern.id} user={intern} />
      ))}
    </div>
  );
}

export default InternsPage;
