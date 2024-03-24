"use client";
import { TMinifiedInterest } from "@/types/interests";
import { TMinifiedTag } from "@/types/tag";
import React from "react";

type Props = {
  tags: TMinifiedTag[];
  interests: TMinifiedInterest[];
};

export default function InternFilter({}: Props) {
  return <div className="w-3/12 bg-red-300">filter</div>;
}
