import { useEffect, useMemo, useState } from "react";
import { getProjects } from "~/services/project/getProjects";
import { type Project } from "~/types/Models";

interface ProjectOptionsParams {
  searchTerm?: string;
  pageSize?: number;
}

export const ProjectOptions = ({
  pageSize,
  searchTerm,
}: ProjectOptionsParams) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = async () => {
    const newProjects = await getProjects({
      page: 1,
      pageSize: pageSize ?? 5,
      title: searchTerm,
    });
    if (!newProjects) return;
    setProjects(newProjects);
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  return useMemo(() => {
    return projects.map((project) => (
      <option
        key={`projects-${project.id}`}
        value={`#${project.id} ${project.title}`}
      ></option>
    ));
  }, [projects]);
};
