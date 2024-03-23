"use client";

import UserDetails from "@/components/layout/onboarding/UserDetails";

import { Card, CardFooter } from "@/components/ui/card";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingSchema } from "@/schemas/onboarding";
import { TOnboardingSchema } from "@/types/onboarding";
import { User, UserType } from "@prisma/client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import InterestsAndTechStack from "./InterestsAndTechStack";
import { TMinifiedTag } from "@/types/tag";
import { TMinifiedInterest } from "@/types/interests";
import { useEffect, useMemo } from "react";
import { onboardingAtom } from "@/store/onboarding";
import { useSetAtom } from "jotai";

type LayoutProps = {
  user: User;
  tags: TMinifiedTag[];
  interests: TMinifiedInterest[];
};

const steps = [
  ["name", "type"] as (keyof TOnboardingSchema)[],
  ["interests"] as (keyof TOnboardingSchema)[],
];

const internSteps = [...steps];
const companySteps = [steps[0]];

type FieldName = keyof TOnboardingSchema;

function OnboardingMainNavigation({ user, tags, interests }: LayoutProps) {
  const setOnboarding = useSetAtom(onboardingAtom);
  const methods = useForm<TOnboardingSchema>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      step: 0,
      name: user.name,
    },
  });

  const type = methods.watch("type");

  const steps = useMemo(() => {
    return type === UserType.INTERN ? internSteps : companySteps;
  }, [type]);

  const step = methods.watch("step");

  const renderStep = () => {
    switch (step) {
      case 0:
        return <UserDetails />;
      case 1:
        return <InterestsAndTechStack />;
      default:
        return null;
    }
  };

  const nextStep = async () => {
    const currentStep = steps[step];
    if (currentStep) {
      const isValid = await methods.trigger(currentStep, {
        shouldFocus: true,
      });

      console.log(isValid);
      if (!isValid) {
        return;
      }
      methods.setValue("step", step + 1);
    }
  };

  const prevStep = () => {
    methods.setValue("step", step - 1);
  };

  const renderSubmitButton = () => {
    if (step === steps.length - 1) {
      return <Button type="submit">Gönder</Button>;
    } else {
      return <Button onClick={nextStep}>İleri</Button>;
    }
  };

  useEffect(() => {
    setOnboarding({
      tags,
      interests,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(values: TOnboardingSchema) {
    console.log(values);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <FormProvider {...methods}>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full max-w-md"
          >
            <Card className="w-full p-6">
              {renderStep()}
              <div className="py-2">
                <Separator />
              </div>
              <CardFooter className="justify-between p-0 pt-2">
                <Button
                  variant="ghost"
                  disabled={step === 0}
                  onClick={prevStep}
                >
                  Geri
                </Button>
                {renderSubmitButton()}
              </CardFooter>
            </Card>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}

export default OnboardingMainNavigation;
