"use client";
import React, { useEffect, useState } from "react";
import InternCard from "@/components/ui/intern-card";
import { useAtom } from "jotai";
import { internsFilterAtom, loadableInternsAtom } from "@/store/intern";
import { Button } from "@/components/ui/button";
import SkeletonInternCard from "../skeletons/intern-card";
import { Card } from "../ui/card";
import { Database } from "lucide-react";

type Props = {};

export default function InternList({}: Props) {
  const [response] = useAtom(loadableInternsAtom);
  const [filters, setFilters] = useAtom(internsFilterAtom);

  const interns = response.state === "hasData" ? response.data.interns : [];

  const nextPage = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const prevPage = () => {
    setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  if (response.state === "hasData" && interns.length === 0) {
    return (
      <Card className="p-4 w-10/12 flex flex-col items-center justify-center">
        <Database size={64} />
        <h2 className="text-center text-lg mt-4">
          Aradığınız kriterlere uygun stajyer bulunamadı.
        </h2>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 w-10/12">
      {response.state === "loading" &&
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonInternCard key={index} />
        ))}

      {interns.map((intern) => (
        <InternCard key={intern.id} user={intern} />
      ))}
      <div className="flex justify-center gap-4">
        <Button
          disabled={response.state === "loading" || filters.page === 1}
          variant={"outline"}
          onClick={prevPage}
        >
          Geri
        </Button>
        <Button
          onClick={nextPage}
          disabled={
            response.state === "loading" ||
            (response.state === "hasData" && !response.data.hasNext)
          }
          variant={"outline"}
        >
          İleri
        </Button>
      </div>
    </div>
  );
}
