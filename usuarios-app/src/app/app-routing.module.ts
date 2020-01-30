import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUsuarioComponent } from "../app/usuarios/form/form.usuario.component";
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'user/add', component: FormUsuarioComponent },
  { path: 'user/edit/:id', component: FormUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
