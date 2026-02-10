<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetPokemonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Public endpoint, so everyone is authorized
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Ensure page is a number and at least 1
            'page' => ['sometimes', 'integer', 'min:1'],
            
            // Limit the items per page (max 100 to prevent API abuse)
            'limit' => ['sometimes', 'integer', 'min:1', 'max:100'],

            // Search query
            'search' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }
    protected function prepareForValidation() 
    {
        $this->merge([
            'page' => $this->input('page', 1),
            'limit' => $this->input('limit', 20),
            'search' => $this->input('search', null),
        ]);
    }
}
