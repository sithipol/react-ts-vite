export interface FormData {
  //   id: number | undefined;
  firstName: string;
  lastName: string;
  gender: string;
  birthDay: Date | null;
  image: string;
}
export interface FilePreview {
  file: File;
  previewUrl: string;
}
