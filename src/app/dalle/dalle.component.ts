import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Configuration, CreateImageRequest, OpenAIApi } from 'openai';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-dalle',
    templateUrl: './dalle.component.html',
    styleUrls: ['./dalle.component.scss']
})
export class DallEComponent {

    openaiForm = this.formBuilder.group({
        prompt: '',
    });

    openai: OpenAIApi;
    submittedPrompt: string | undefined;
    imageResults: string[] | undefined;

    constructor(
        private formBuilder: FormBuilder,
    ) {
        const configuration = new Configuration({
            apiKey: environment.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    uploadImage() {
        alert('Currently unavailable feature :(');
    }

    onSubmit(): void {
        const prompt = this.openaiForm.controls['prompt'].value;
        if (!prompt) {
            return;
        }

        this.imageResults = undefined;
        this.submittedPrompt = prompt;
        const createImageRequest: CreateImageRequest = {
            prompt,
            n: 2,
            size: '256x256'
        };
        this.openai.createImage(createImageRequest).then(response => {
            console.log(response);
            if (response?.data?.data) {
                this.imageResults = [];
                for (let data of response.data.data) {
                    if (data?.url) {
                        this.imageResults.push(data.url);
                    }
                }
            }
        });
        // this.imageResults = [
        //     'https://www.researchgate.net/profile/Tao-Chen-87/publication/3935609/figure/fig1/AS:394647298953219@1471102656485/8-bit-256-x-256-Grayscale-Lena-Image_Q320.jpg',
        //     'https://upload.wikimedia.org/wikipedia/commons/3/3e/Tree-256x256.png',
        //     'https://i.pinimg.com/originals/24/8a/45/248a452587f56539da876d6e2bd13007.png',
        //     'https://www.codinter.com/en/wp-content/uploads/sites/2/2018/01/logo-volkswagen-256x256.png',
        // ];

        this.openaiForm.reset();
    }
}
