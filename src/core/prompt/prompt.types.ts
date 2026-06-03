export type PromptType = 'input' | 'number' | 'password';

export type ReturnPromptType<T> = T extends 'number' ? number : string;
