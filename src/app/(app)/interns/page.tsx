import { getCachedInterests } from "@/actions/interestActions";
import { getCachedTags } from "@/actions/tagActions";
import InternFilter from "@/components/filters/InternFilter";
import InternList from "@/components/list/intern-list";

async function InternsPage() {
  const [tags, interests] = await Promise.all([
    getCachedTags(),
    getCachedInterests(),
  ]);

  return (
    <div className="flex flex-row w-full">
      <InternFilter tags={tags} interests={interests} />
      <InternList />
    </div>
  );
}

export default InternsPage;
