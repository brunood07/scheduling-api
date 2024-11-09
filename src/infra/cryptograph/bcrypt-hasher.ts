import { compare, hash } from 'bcryptjs'
import { HashComparer } from '../../domain/clients/application/cryptograph/hash-comparer'
import { HasherGenerator } from '../../domain/clients/application/cryptograph/hash-generator'

export class BcryptHasher implements HashComparer, HasherGenerator {
  private HASH_SALT_LENGTH = 8

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}