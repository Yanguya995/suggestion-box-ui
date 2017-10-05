import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './api/component/profile/profile.component';
import { ChatComponent } from './api/component/chat/chat.component';
import { LoginComponent } from './api/component/login/login.component';
import { RegisterComponent } from './api/component/register/register.component';
export const Route: Routes = [
    {path: 'profile', component: ProfileComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', component: LoginComponent}
];

export const Routing = RouterModule.forRoot(Route);
