import { FileAction } from "./file-action";

export type AccessPolicy = {
  [userId: string]: FileAction[];
};
