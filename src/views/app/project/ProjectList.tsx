import { useMemo } from "react";
import { Divider } from "~/components/common/Divider";
import { ProjectRow } from "~/components/project/ProjectRow";

import { type Project } from "~/types/Models";
import { type ProjectSortTarget } from "~/types/project/sort-project";
import { type SortOrder } from "~/types/Sort";

interface ProjectListParams {
  projects: Project[];
  onClick: (project: Project) => void;
  sortOrder: SortOrder;
  sortTarget: ProjectSortTarget | undefined;
}

const sortProjects = (
  input_projects: Project[] | undefined,
  sortOrder: SortOrder,
  input_sortTarget: ProjectSortTarget | undefined,
): Project[] => {
  const sortOrderFactor = sortOrder === "asc" ? 1 : -1;
  let sortTarget = input_sortTarget;
  if (!sortTarget) sortTarget = "id";
  if (sortTarget === "targetDate")
    return (
      input_projects?.sort(
        (a, b) =>
          (new Date(a.targetDate ?? "").getTime() -
            new Date(b.targetDate ?? "").getTime()) *
          sortOrderFactor,
      ) ?? []
    );
  if (["id", "customerId", "assignedId"].includes(sortTarget))
    return (
      input_projects?.sort(
        (a, b) =>
          (Number(a[sortTarget]) - Number(b[sortTarget])) * sortOrderFactor,
      ) ?? []
    );

  return (
    input_projects?.sort(
      (a, b) =>
        a[sortTarget].toString().localeCompare(b[sortTarget].toString()) *
        sortOrderFactor,
    ) ?? []
  );
};

export const ProjectList = ({
  projects,
  onClick,
  sortOrder,
  sortTarget,
}: ProjectListParams) => {
  const projectRows = useMemo(() => {
    const sorted = sortProjects(projects, sortOrder, sortTarget);
    return sorted.map((project) => {
      return (
        <>
          <ProjectRow
            project={project}
            className="px-8 py-4"
            key={`project-${project.id}-r(${Math.random()})`}
            onClick={() => onClick(project)}
          />
          <Divider />
        </>
      );
    });
  }, [projects, sortOrder, sortTarget]);

  return projectRows;
};
