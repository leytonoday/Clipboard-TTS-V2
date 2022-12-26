export type GetBase64AudioArgs = {
  input: string;
  apiKey?: string;
  includeTimepoints?: boolean;
  voice?: { name: string; languageCode: string; ssmlGender: string; };
  isSsml?: boolean;
  isAnnouncement?: boolean;
}

export type GetBase64AudioReturn = { audioContent: string; timepoints: any };

export type GetBase64ImageArgs = {
  base64Input: string;
  apiKey?: string;
  mimeType: string;
}
