import * as secp from "@noble/secp256k1";

export type ExtendedKeyPrefix = {
  private: number;
  public: number;
};

const BITCOIN_PREFIX: ExtendedKeyPrefix = {
  private: 0x0488ade4,
  public: 0x0488b21e,
};

type HdKeyProps = {};

export class HdKey {
  public readonly prefix: ExtendedKeyPrefix;
  public readonly depth: number = 0;
  public readonly index: number = 0;

  constructor() {}

  public static fromMasterSeed(
    seed: Uint8Array,
    versions: ExtendedKeyPrefix = BITCOIN_PREFIX
  ) {}
}
