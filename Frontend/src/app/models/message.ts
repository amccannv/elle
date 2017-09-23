export class Message {
  constructor(options: {
    isUser?: boolean,
    langUser?: string,
    langStranger?: string,
  } = {}) {
    this.isUser = options.isUser;
    this.langUser = options.langUser;
    this.langStranger = options.langStranger;
  }

  isUser: boolean;
  langUser: string;
  langStranger: string;
}
