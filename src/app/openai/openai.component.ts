import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-openai',
    templateUrl: './openai.component.html',
    styleUrls: ['./openai.component.scss']
})
export class OpenAIComponent {

    openaiForm = this.formBuilder.group({
        prompt: '',
    });

    openai: OpenAIApi;
    submittedPrompts: string[] = [];
    completionResults: string[] = [];

    constructor(
        private formBuilder: FormBuilder,
    ) {
        const configuration = new Configuration({
            apiKey: environment.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    onSubmit(): void {
        const prompt = this.openaiForm.controls['prompt'].value;
        if (!prompt) {
            return;
        }

        const createCompletionRequest: CreateCompletionRequest = {
            model: 'text-ada-001',
            prompt,
            temperature: 0.5,
            max_tokens: 50,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        };
        this.openai.createCompletion(createCompletionRequest).then(response => {
            console.log(response);
            if (response?.data?.choices && response.data.choices[0]?.text) {
                this.submittedPrompts.unshift(prompt);
                this.completionResults.unshift(response.data.choices[0].text);
            }
        });

        // for local development (without going to openai api)
        // this.submittedPrompts.unshift(prompt);
        // this.completionResults.unshift('response.data.choices[0].text');

        this.openaiForm.reset();
    }
}
