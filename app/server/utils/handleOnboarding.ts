import type { User, UserData } from '@nymphjs/tilmeld';

import type { Project as ProjectClass } from '../entities/Project.js';
import type { Todo as TodoClass } from '../entities/Todo.js';

export default async function handleOnboarding(user: User & UserData) {
  const nymph = user.$nymph.clone();

  const Project = nymph.getEntityClass('Project') as typeof ProjectClass;
  const Todo = nymph.getEntityClass('Todo') as typeof TodoClass;

  // Create a new Project.
  let project = Project.factorySync();
  project.name = 'My Tasks';
  project.done = false;
  await project.$save();

  let projectIntro = Project.factorySync();
  projectIntro.name = 'Intro';
  projectIntro.done = false;
  projectIntro.parent = project;
  await projectIntro.$save();

  let projectOngoing = Project.factorySync();
  projectOngoing.name = 'Ongoing';
  projectOngoing.done = false;
  projectOngoing.parent = project;
  await projectOngoing.$save();

  let todoIntro = Todo.factorySync();
  todoIntro.text = 'Start using the todo app to track my tasks!';
  todoIntro.done = false;
  todoIntro.project = projectIntro;
  await todoIntro.$save();

  let todoOngoing = Todo.factorySync();
  todoOngoing.text =
    'Make awesome projects with Nymph.js, SMUI, and SvelteKit!';
  todoOngoing.done = false;
  todoOngoing.project = projectOngoing;
  await todoOngoing.$save();
}
