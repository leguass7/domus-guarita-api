import { hash } from 'bcryptjs';

export async function generateHashPassword(password: string) {
  const Pbcrypt = await hash(password, 8);
  return Pbcrypt;
}
