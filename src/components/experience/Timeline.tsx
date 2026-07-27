"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { getExperiences } from "@/lib/data";
import type { FlatExperience } from "@/types/experience";
import { ExperienceCard } from "./ExperienceCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EmptyState } from "@/components/common/EmptyState";
import { staggerContainer, staggerItem } from "@/animations";
import { fadeInUp } from "@/animations";
import { mapExperienceToFlat } from "./utils/experience.utils";

export interface TimelineProps {
  initialData?: FlatExperience[];
}

export function Timeline({ initialData }: TimelineProps) {
  const [experiences, setExperiences] = useState<FlatExperience[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      getExperiences()
        .then((data) => {
          if (data && data.length > 0) {
            setExperiences(data.map((exp: any, index: number) => mapExperienceToFlat(exp, index)));
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setExperiences(initialData);
      setIsLoading(false);
    }
  }, [initialData]);

  if (isLoading) {
    return (
      <section
        id="experience"
        className="py-20 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center"
      >
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
      </section>
    );
  }

  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : staggerItem;

  return (
    <section
      id="experience"
      className="py-20 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-labelledby="experience-heading"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={prefersReducedMotion ? { hidden: {}, visible: {} } : fadeInUp}
      >
        <SectionHeading
          title="Experience"
          subtitle="Where I've contributed and what I've learned along the way."
        />
      </motion.div>

      {experiences.length === 0 ? (
        <EmptyState 
          title="No professional experience added yet."
          description="More updates coming soon."
        />
      ) : (
        <motion.div
          className="flex flex-col gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {experiences.map((exp, idx) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={idx}
              variants={cardVariants}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
