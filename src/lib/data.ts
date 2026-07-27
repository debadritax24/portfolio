"use server";

import {
  getProjects as queryProjects,
  getProjectBySlug as queryProjectBySlug,
} from "@/lib/db/queries/projects";
import {
  getBlogs as queryBlogs,
  getBlogBySlug as queryBlogBySlug,
} from "@/lib/db/queries/blogs";
import {
  getCertifications as queryCertifications,
  getCertificationBySlug as queryCertificationBySlug,
} from "@/lib/db/queries/certifications";
import {
  getExperiences as queryExperiences,
  getExperienceBySlug as queryExperienceBySlug,
} from "@/lib/db/queries/experiences";

// ─── Projects ─────────────────────────────────────────────────────────

export async function getProjects() {
  try {
    return await queryProjects(true);
  } catch (e) {
    console.error("getProjects error:", e);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await queryProjectBySlug(slug);
  } catch {
    return null;
  }
}

// ─── Blogs ────────────────────────────────────────────────────────────

export async function getBlogs() {
  try {
    return await queryBlogs(true);
  } catch (e) {
    console.error("getBlogs error:", e);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    return await queryBlogBySlug(slug);
  } catch (e) {
    console.error("getBlogBySlug error:", e);
    return null;
  }
}

// ─── Certifications ───────────────────────────────────────────────────

export async function getCertifications() {
  try {
    return await queryCertifications(true);
  } catch (e) {
    console.error("getCertifications error:", e);
    return [];
  }
}

export async function getCertificationBySlug(slug: string) {
  try {
    return await queryCertificationBySlug(slug);
  } catch {
    return null;
  }
}

// ─── Experiences ──────────────────────────────────────────────────────

export async function getExperiences() {
  try {
    return await queryExperiences(true);
  } catch (e) {
    console.error("getExperiences error:", e);
    return [];
  }
}

export async function getExperienceBySlug(slug: string) {
  try {
    return await queryExperienceBySlug(slug);
  } catch {
    return null;
  }
}
