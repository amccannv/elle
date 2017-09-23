export class Language {
  constructor(options: {
    id?: number,
    code?: string,
    codeSpeech?: string,
    display?: string
  } = {}) {
    this.id = options.id;
    this.code = options.code;
    this.codeSpeech = options.codeSpeech;
    this.display = options.display;
  }

  id: number;
  code: string;
  codeSpeech: string;
  display: string;
}
