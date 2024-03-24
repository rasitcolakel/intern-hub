import { fetchInterns } from "@/actions/userActions";
import { GetInternsRequest, GetInternsResponse } from "@/types/user";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const initialInternsFilter: GetInternsRequest = {
  page: 1,
  limit: 10,
};

export const internsFilterAtom = atom<GetInternsRequest>(initialInternsFilter);
internsFilterAtom.debugLabel = "internsFilterAtom";

export const internsAtom = atom<Promise<GetInternsResponse>>(async (get) => {
  const filters = get(internsFilterAtom);

  const response = await fetchInterns(filters);

  return response;
});
internsAtom.debugLabel = "internsAtom";

export const loadableInternsAtom = loadable(internsAtom);
loadableInternsAtom.debugLabel = "loadableInternsAtom";
