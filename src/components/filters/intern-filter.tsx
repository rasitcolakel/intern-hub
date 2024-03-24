"use client";
import { TMinifiedInterest } from "@/types/interests";
import { TMinifiedTag } from "@/types/tag";
import React from "react";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useAtom } from "jotai";
import {
  initialInternsFilter,
  internsFilterAtom,
  loadableInternsAtom,
} from "@/store/intern";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../ui/form";

type Props = {
  tags: Option[];
  interests: Option[];
};

const FilterSchema = z.object({
  interests: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        id: z.string(),
      })
    )
    .optional(),
  tags: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        id: z.string(),
      })
    )
    .optional(),
});

type TInternFilterSchema = z.infer<typeof FilterSchema>;

export default function InternFilter({ tags, interests }: Props) {
  const { control, handleSubmit, reset, formState, trigger } =
    useForm<TInternFilterSchema>({
      resolver: zodResolver(FilterSchema),
    });

  const [filter, setFilter] = useAtom(internsFilterAtom);
  const [response] = useAtom(loadableInternsAtom);

  const handleFilter = (values: TInternFilterSchema) => {
    setFilter({
      ...filter,
      tagIds: values.tags?.map((t) => t.id) || [],
      interestIds: values.interests?.map((i) => i.id) || [],
    });
  };

  const resetFilter = () => {
    reset();
    trigger("tags");
    setFilter(initialInternsFilter);
  };

  return (
    <div className="w-3/12 p-4 border border-gray-200 rounded-md">
      <div className="flex flex-col">
        <div className="w-full">
          <Label>İlgi Alanları</Label>
          <FormField
            control={control}
            name="interests"
            render={({ field }) => (
              <MultipleSelector
                options={interests}
                placeholder="İlgi alanı seçin"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    Sonuç bulunamadı.
                  </p>
                }
                className="mt-2"
                {...field}
              />
            )}
          />
        </div>
        <div className="w-full mt-4">
          <Label>Teknolojiler</Label>
          <FormField
            control={control}
            name="tags"
            render={({ field }) => (
              <MultipleSelector
                options={tags}
                placeholder="Teknoloji seçin"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    Sonuç bulunamadı.
                  </p>
                }
                className="mt-2"
                {...field}
              />
            )}
          />
        </div>
        <Button
          className="mt-4"
          type="button"
          onClick={handleSubmit(handleFilter)}
          disabled={response.state === "loading"}
        >
          Filtrele
        </Button>
        <Button
          className="mt-4"
          type="button"
          onClick={resetFilter}
          disabled={response.state === "loading" || !formState.isSubmitted}
          variant="outline"
        >
          Sıfırla
        </Button>
      </div>
    </div>
  );
}
