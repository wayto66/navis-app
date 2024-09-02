/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react/dist/iconify.js";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/common/Button";
import { DateSelector } from "~/components/common/DateSelector";
import { Divider } from "~/components/common/Divider";
import { InputSelect } from "~/components/common/InputSelect";
import { InputText } from "~/components/common/InputText";
import { Table } from "~/components/table/Table";
import useDebounce from "~/hooks/useDebounce";
import { getProject } from "~/services/project/getProject";
import {
  getProjects,
  type GetProjectsParams,
} from "~/services/project/getProjects";
import { type Project, TaskStatus } from "~/types/Models";
import { type ProjectSortTarget } from "~/types/project/sort-project";

import { type SortOrder } from "~/types/Sort";
import { CustomerOptions } from "~/views/app/customer/CustomerOptions";

import { ProjectCreateView } from "~/views/app/project/ProjectCreateView";
import { ProjectEditView } from "~/views/app/project/ProjectEditView";
import { ProjectList } from "~/views/app/project/ProjectList";
import { UserOptions } from "~/views/app/user/UserOptions";

const ProjectListPage: NextPage = () => {
  const router = useRouter();
  const { register, setValue, watch, getValues } = useForm<GetProjectsParams>();
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [sortTarget, setSortTarget] = useState<string | undefined>(
    "targetDate",
  );

  const [projectCreateViewVisible, setProjectCreateViewVisible] =
    useState(false);
  const [ProjectEditViewVisible, setProjectEditViewVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>();
  const debouncedTitle = useDebounce(watch("title"), 500);

  const closeProjectCreateView = async (update?: boolean) => {
    if (update) await loadProjects();
    setProjectCreateViewVisible(false);
  };
  const openProjectCreateView = () => setProjectCreateViewVisible(true);
  const closeProjectEditView = async (update?: boolean) => {
    if (update) await loadProjects();
    setProjectEditViewVisible(false);
  };
  const openProjectEditView = (project: Project) => {
    setCurrentProject(project);
    setProjectEditViewVisible(true);
  };

  const loadProjects = async () => {
    const searchValues = getValues();
    const newProjects = await getProjects({ ...searchValues, page: 1 });
    setProjects(newProjects ?? []);
  };

  const handleReorder = (target: string | undefined) => {
    if (target !== sortTarget) {
      setSortOrder("asc");
      setSortTarget(target);
      return;
    }
    if (sortOrder === "dsc") {
      setSortTarget(undefined);
      return;
    }
    if (sortOrder === "asc") {
      setSortOrder("dsc");
      return;
    }
    setSortOrder("asc");
  };

  const checkProjectIdInUrl = async () => {
    const { project_id } = router.query;
    const projectId = Number(project_id);
    if (isNaN(projectId)) return;
    const project = await getProject({ id: projectId });
    if (!project) {
      toast.error(`Solicitação com id #${projectId} não encontrada.`);
      return;
    }
    openProjectEditView(project);
  };

  useEffect(() => {
    void loadProjects();
  }, [
    debouncedTitle,
    watch("customerId"),
    watch("userId"),
    watch("status"),
    watch("dateRange"),
  ]);

  useEffect(() => {
    void checkProjectIdInUrl();
  }, [router.query]);

  return (
    <main className="flex min-h-screen w-full items-start justify-center">
      {projectCreateViewVisible && (
        <ProjectCreateView handleClose={closeProjectCreateView} />
      )}
      {ProjectEditViewVisible && (
        <ProjectEditView
          handleClose={closeProjectEditView}
          projectId={currentProject?.id}
        />
      )}

      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-white shadow-md">
        <div className="flex w-full items-center justify-start px-8 pt-8 text-2xl font-semibold text-dark">
          <h2>Filtros</h2>
        </div>
        <div className="grid w-full grid-cols-4 items-start justify-center justify-between gap-8 px-8">
          <DateSelector setValue={setValue} />
          <InputSelect register={register} className="grow" paramName="userId">
            <option value={""}>Selecionar Usuário</option>
            <UserOptions />
          </InputSelect>
          <InputSelect
            register={register}
            className="grow"
            paramName="customerId"
          >
            <option value={""}>Selecionar Cliente</option>
            <CustomerOptions />
          </InputSelect>
          <InputSelect register={register} className="grow" paramName="status">
            <option value={""}>Selecionar Estado</option>
            <option value={TaskStatus.DEFINE_DEADLINE}>📆 Definir Prazo</option>
            <option value={TaskStatus.PENDING}>💤 Pendente</option>
            <option value={TaskStatus.IN_PROGRESS}>🔨 Em Progresso</option>
            <option value={TaskStatus.IN_CHANGE}>🚧 Em Alteração</option>
            <option value={TaskStatus.IN_APPROVAL}>🕵️‍♀️ Em Aprovação</option>
            <option value={TaskStatus.COMPLETED}>✅ Finalizada</option>
            <option value={TaskStatus.CANCELLED}>❌ Cancelada</option>
            <option value={TaskStatus.LOCKED}>🔒 Travada</option>
          </InputSelect>
        </div>

        <Divider />
        <div className="flex w-full flex-row gap-8 px-8">
          <InputSelect register={register} paramName="pageSize">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </InputSelect>
          <div className="ml-auto flex gap-8">
            <InputText
              paramName="title"
              register={register}
              placeholder="Pesquisar por..."
              className="ml-auto"
              icon="material-symbols:search"
            />
            <Button
              className="flex !w-max flex-row gap-2"
              onClick={openProjectCreateView}
            >
              <Icon icon="ic:baseline-plus" />
              <span className="w-max">Novo projeto</span>
            </Button>
          </div>
        </div>
        <Divider />
        <Table
          cols={8}
          heads={[
            {
              label: "Prazo",
              paramName: "targetDate",
            },
            {
              label: "Estado",
              paramName: "status",
            },
            {
              label: "Prioridade",
              paramName: "priority",
            },
            {
              label: "Título",
              paramName: "title",
              className: "col-span-2",
            },
            {
              label: "Progresso",
              paramName: "progress",
            },
            {
              label: "Responsável",
              paramName: "assignedId",
            },
            {
              label: "Criado",
              paramName: "creatorId",
            },
          ]}
        >
          <ProjectList
            projects={projects}
            onClick={openProjectEditView}
            sortOrder={sortOrder}
            sortTarget={sortTarget as ProjectSortTarget}
          />
        </Table>

        <Divider />
      </div>
    </main>
  );
};

export default ProjectListPage;
