import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DallEComponent } from './dalle/dalle.component';
import { OpenAIComponent } from './openai/openai.component';

const routes: Routes = [
    { path: '', redirectTo: 'openai', pathMatch: 'prefix' },
    { path: 'openai', component: OpenAIComponent },
    { path: 'dalle', component: DallEComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
