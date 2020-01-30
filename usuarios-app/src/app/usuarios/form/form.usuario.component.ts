import { Component, OnInit } from '@angular/core';
import { Usuario } from "../usuario";
import { UsuariosService } from '../usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form.usuario.component.html',
  styleUrls: ['./form.usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  constructor(private usuariosService: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  titulo: string = "Crear Usuario"
  public usuario: Usuario = new Usuario(); 

  ngOnInit() {
    this.titulo = "Crear usuario"
    this.activatedRoute.paramMap.subscribe(param => {
      let id : string = param.get('id');
      if(id) {
        this.titulo = "Editar Usuario";
        this.usuariosService.getUser(id).subscribe(
          x => {
            this.usuario = x;
            console.log(this.usuario);
          }
        )
      }
    })
  }

  create() {
    this.usuariosService.createUser(this.usuario)
      .subscribe(
        usuario => {
          this.router.navigate(['/']);
        },
        err => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update() {
    this.usuariosService.updateUser(this.usuario, this.usuario.id)
    .subscribe(usuario => {
      this.router.navigate(['/']);
    })
  }

}
