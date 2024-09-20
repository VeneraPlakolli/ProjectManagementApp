import ProjectsSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [
      {
        id: 1,
        title: "Website Redesign",
        description:
          "Redesign the company website to improve user experience and update the brand identity.",
        dueDate: "12/23/24",
      },
      {
        id: 2,
        title: "Mobile App Development",
        description:
          "Develop a cross-platform mobile application for our e-commerce platform.",
        dueDate: "01/15/25",
      },
      {
        id: 3,
        title: "Marketing Campaign Launch",
        description:
          "Plan and execute a digital marketing campaign for the launch of our new product line.",
        dueDate: "02/10/25",
      },
    ],
    tasks: [],
  });

  function handleStartNewProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelNewProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  function handleAddTask(taskData) {
    setProjectsState((prevState) => {
      const newTask = {
        text: taskData,
        projectId: prevState.selectedProjectId,
        id: Math.random(),
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleStartNewProject} />;
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onCancelProject={handleCancelNewProject}
        onAddNewProject={handleAddProject}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onAddProject={handleStartNewProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
