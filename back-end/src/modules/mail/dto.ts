export interface MailCreateDto {
    from: string;
    to: string | string[];
    subject: string;
    content: string;
}