import { HashComparer } from "../../src/domain/clients/application/cryptograph/hash-comparer"
import { HasherGenerator } from "../../src/domain/clients/application/cryptograph/hash-generator"

export class FakeHasher implements HasherGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}