import { getCachedInterests } from "@/actions/interestActions";
import { getCachedTags } from "@/actions/tagActions";
import InternFilter from "@/components/filters/intern-filter";
import InternList from "@/components/list/intern-list";
import { Separator } from "@/components/ui/separator";

async function InternsPage() {
  const [tags, interests] = await Promise.all([
    getCachedTags(),
    getCachedInterests(),
  ]);

  const tagOptions = tags.map((tag) => ({
    label: tag.name,
    value: tag.name,
    id: tag.id,
  }));

  const interestOptions = interests.map((interest) => ({
    label: interest.name,
    value: interest.name,
    id: interest.id,
  }));

  return (
    <div className="flex flex-col w-full gap-4 py-4">
      <p className="text-2xl font-semibold text-gray-800">Staj Arayanlar</p>
      <Separator />
      <div className="flex flex-row w-full gap-x-4">
        <InternFilter tags={tagOptions} interests={interestOptions} />
        <InternList />
      </div>
    </div>
  );
}

export default InternsPage;
