import { Routes } from "@angular/router";
export const routes: Routes = [
  {
    path: "",
    redirectTo: "/land/list",
    pathMatch: "full",
  },
  {
    path: "land",
    children: [
      {
        path: "list",
        loadComponent: () =>
          import("./pages/land/list/list.page").then((m) => m.ListPage),
        data: { title: "Lista de Predios" },
      },
      {
        path: "create",
        loadComponent: () =>
          import("./pages/land/create/create.page").then((m) => m.CreatePage),
        data: { title: "Crear Predio" },
      },
      {
        path: "detail/:id",
        loadComponent: () =>
          import("./pages/land/detail/detail.page").then((m) => m.DetailPage),
        data: { title: "Detalle del Predio" },
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import("./pages/land/edit/edit.page").then((m) => m.EditPage),
        data: { title: "Editar Predio" },
      },
    ],
  },
  {
    path: "animal",
    children: [
      {
        path: "list",
        loadComponent: () =>
          import("./pages/animal/list/list.page").then((m) => m.ListPage),
        data: { title: "Lista de Animales" },
      },
      {
        path: "create",
        loadComponent: () =>
          import("./pages/animal/create/create.page").then((m) => m.CreatePage),
        data: { title: "Crear Animal" },
      },
      {
        path: "detail/:id",
        loadComponent: () =>
          import("./pages/animal/detail/detail.page").then((m) => m.DetailPage),
        data: { title: "Detalle del Animal" },
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import("./pages/animal/edit/edit.page").then((m) => m.EditPage),
        data: { title: "Editar Animal" },
      },
    ],
  },
  {
    path: "tag",
    children: [
      {
        path: "list",
        loadComponent: () =>
          import("./pages/tag/list/list.page").then((m) => m.ListPage),
        data: { title: "Lista de Caravanas" },
      },
      {
        path: "create",
        loadComponent: () =>
          import("./pages/tag/create/create.page").then((m) => m.CreatePage),
        data: { title: "Crear Caravana" },
      },
      {
        path: "detail/:id",
        loadComponent: () =>
          import("./pages/tag/detail/detail.page").then((m) => m.DetailPage),
        data: { title: "Detalle de la Caravana" },
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import("./pages/tag/edit/edit.page").then((m) => m.EditPage),
        data: { title: "Editar Caravana" },
      },
    ],
  },
  {
    path: "user",
    children: [
      {
        path: "list",
        loadComponent: () =>
          import("./pages/user/list/list.page").then((m) => m.ListPage),
        data: { title: "Lista de Usuarios" },
      },
      {
        path: "create",
        loadComponent: () =>
          import("./pages/user/create/create.page").then((m) => m.CreatePage),
        data: { title: "Crear Usuario" },
      },
      {
        path: "detail/:id",
        loadComponent: () =>
          import("./pages/user/detail/detail.page").then((m) => m.DetailPage),
        data: { title: "Detalle del Usuario" },
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import("./pages/user/edit/edit.page").then((m) => m.EditPage),
        data: { title: "Editar Usuario" },
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        loadComponent: () =>
          import("./pages/auth/login/login.page").then((m) => m.LoginPage),
        data: { title: "Iniciar Sesión" },
      },
      {
        path: "register",
        loadComponent: () =>
          import("./pages/auth/register/register.page").then(
            (m) => m.RegisterPage
          ),
        data: { title: "Registrarse" },
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/land/list",
  },
];
