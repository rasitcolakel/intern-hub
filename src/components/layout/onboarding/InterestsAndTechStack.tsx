import { TOnboardingSchema } from "@/types/onboarding";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserType } from "@prisma/client";
import { Building2, UserRoundSearch } from "lucide-react";
import { useAtomValue } from "jotai";
import { onboardingAtom } from "@/store/onboarding";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { TMinifiedTag } from "@/types/tag";
import { TMinifiedInterest } from "@/types/interests";

type Props = {};

const InterestsAndTechStack = (props: Props) => {
  const { setValue, watch, trigger, control } =
    useFormContext<TOnboardingSchema>();

  const onboarding = useAtomValue(onboardingAtom);

  const { tags, interests } = onboarding;

  // const tags: Option[] = useMemo(() => {
  //   return onboarding.tags.map((tag) => ({
  //     label: tag.name,
  //     value: tag.id,
  //   }));
  // }, [onboarding.tags]);

  // const interests: Option[] = useMemo(() => {
  //   return onboarding.interests.map((interest) => ({
  //     label: interest.name,
  //     value: interest.id,
  //   }));
  // }, [onboarding.interests]);

  return (
    <CardHeader className="p-2">
      <CardTitle>İlgilendiğiniz Alanlar</CardTitle>
      <CardDescription>
        İlgilendiğiniz alanları ve teknolojileri seçerek devam edebilirsiniz.
      </CardDescription>
      <div className="flex py-3">
        <Separator />
      </div>
      <CardContent className="p-2">
        <div className="w-full">
          <Label>İlgi Alanları</Label>
          <FormField
            control={control}
            name="interests"
            render={({ field }) => (
              <MultipleSelector
                options={interests}
                placeholder="İlgi alanlarınızı seçin"
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
                placeholder="Teknolojileri seçin"
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
      </CardContent>
    </CardHeader>
  );
};

export default InterestsAndTechStack;
