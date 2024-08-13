/// <reference types="next" />
/// <reference types="next/image-types/global" />

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
  };
  
  declare module "next-auth" {
    interface Session {
      user: ExtendedUser;
      isTwoFactorEnabled: boolean;
    }
  }
  
  // NOTE: This file should not be edited
  // see https://nextjs.org/docs/basic-features/typescript for more information.
  