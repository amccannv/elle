export class Language {
  constructor(options: {
    id?: number,
    code?: string,
    display?: string
  } = {}) {
    this.id = options.id;
    this.code = options.code;
    this.display = options.display;
  }

  id: number;
  code: string;
  display: string;
}
