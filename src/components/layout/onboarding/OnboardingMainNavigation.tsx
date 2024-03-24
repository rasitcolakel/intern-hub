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
import { updateUser } from "@/actions/userActions";
import { useRouter } from "next/navigation";

type LayoutProps = {
  user: User;
  tags: TMinifiedTag[];
  interests: TMinifiedInterest[];
};

const steps = [
  ["name", "type", "about"] as (keyof TOnboardingSchema)[],
  ["interests"] as (keyof TOnboardingSchema)[],
];

const internSteps = [...steps];
const companySteps = [steps[0]];

function OnboardingMainNavigation({ user, tags, interests }: LayoutProps) {
  const setOnboarding = useSetAtom(onboardingAtom);
  const methods = useForm<TOnboardingSchema>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      step: 0,
      name: user.name,
      about: user.about,
    },
  });

  const router = useRouter();

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
      return (
        <Button
          type="submit"
          key="submit"
          disabled={methods.formState.isSubmitting}
        >
          Gönder
        </Button>
      );
    } else {
      return (
        <Button onClick={nextStep} type="button" key="next">
          İleri
        </Button>
      );
    }
  };

  useEffect(() => {
    setOnboarding({
      tags: tags.map((tag) => ({
        label: tag.name,
        value: tag.name,
        id: tag.id,
      })),
      interests: interests.map((interest) => ({
        label: interest.name,
        value: interest.name,
        id: interest.id,
      })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(values: TOnboardingSchema) {
    try {
      await updateUser(values);
      router.replace("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
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
