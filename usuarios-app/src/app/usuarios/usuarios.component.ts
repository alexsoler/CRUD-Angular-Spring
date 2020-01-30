import { Component, OnInit } from '@angular/core';
import { UsuariosService } from "./usuarios.service";
import { Usuario } from "./usuario";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

  users: Usuario[] = [];

  ngOnInit() {
    this.usuariosService.getUsers()
      .subscribe( x => this.users = x)
  }

  delete(id: string) {
    this.usuariosService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(x => x.id != id)
      }
    )
  }

}
