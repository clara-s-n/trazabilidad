"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.routes = [
    {
        path: 'auth/login',
        pathMatch: 'full',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('./routes/auth/pages/login/login.page'); }).then(function (m) { return m.LoginPage; });
        },
        children: [{
            // Rutas anidadas
            }]
    },
    {
        path: '',
        redirectTo: 'folder/inbox',
        pathMatch: 'full',
    },
    {
        path: 'folder/:id',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('./folder/folder.page'); }).then(function (m) { return m.FolderPage; });
        },
    },
];
