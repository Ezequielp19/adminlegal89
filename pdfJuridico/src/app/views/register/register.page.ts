import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../common/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  registroExitoso: boolean = false; // Nueva propiedad
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router,private alertController: AlertController) { }

  register() {
    this.authService.register(this.email, this.password)
      .then(() => {
        this.registroExitoso = true; 
        setTimeout(() => {
          this.router.navigate(['/login']); 
        }, 2000); 
      })
      .catch(error => {
        console.error(error);
        this.errorMessage = this.getErrorMessage(error.code); 
        this.mostrarAlertaError(); 
      });
  }

   private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      default:
        return 'Ocurrió un error durante el registro.';
    }
  }

  // Función para mostrar una alerta de error
  async mostrarAlertaError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: this.errorMessage,
      buttons: ['OK']
    });
    await alert.present();
  }

}

