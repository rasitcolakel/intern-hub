"use client";
import React, { useEffect, useState } from "react";
import InternCard from "@/components/ui/intern-card";
import { useAtom } from "jotai";
import { internsFilterAtom, loadableInternsAtom } from "@/store/intern";
import { Button } from "@/components/ui/button";

type Props = {};

export default function InternList({}: Props) {
  const [response] = useAtom(loadableInternsAtom);
  const [filters, setFilters] = useAtom(internsFilterAtom);

  const interns = response.state === "hasData" ? response.data.interns : [];

  const nextPage = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 w-10/12">
      {interns.map((intern) => (
        <InternCard key={intern.id} user={intern} />
      ))}
      <Button onClick={nextPage} disabled={response.state === "loading"}>
        Next
      </Button>
    </div>
  );
}
