import { TOnboardingSchema } from "@/types/onboarding";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserType } from "@prisma/client";
import { Building2, UserRoundSearch } from "lucide-react";

type Props = {};

const UserDetails = (props: Props) => {
  const { control } = useFormContext<TOnboardingSchema>();

  return (
    <CardHeader className="p-2">
      <CardTitle>Hesap Bilgileri</CardTitle>
      <CardDescription>
        Hesap bilgilerini girerek devam edebilirsin.
      </CardDescription>
      <div className="flex py-3">
        <Separator />
      </div>
      <CardContent className="p-2">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Ad Soyad</FormLabel>
              <FormControl>
                <Input placeholder="Ad Soyad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex py-5">
          <Separator />
        </div>
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Kayıt nedeniniz?</FormLabel>
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-2 gap-4"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className="flex w-full">
                    <FormControl className="w-full">
                      <div>
                        <RadioGroupItem
                          value={UserType.INTERN}
                          id={"selection-" + UserType.INTERN}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={"selection-" + UserType.INTERN}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-primary"
                        >
                          <UserRoundSearch size={32} className="mb-3" />
                          Stajyer
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl className="w-full">
                      <div>
                        <RadioGroupItem
                          value={UserType.COMPANY}
                          id={"selection-" + UserType.COMPANY}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={"selection-" + UserType.COMPANY}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-primary"
                        >
                          <Building2 size={32} className="mb-3" />
                          İşveren
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </CardHeader>
  );
};

export default UserDetails;
