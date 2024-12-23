export class IdResource {
  private idSetIdle: Set<number> = new Set();
  private idSetUsed: Set<number> = new Set();

  constructor(begin: number, end: number) {
    for (let i = begin; i < end; i++) {
      this.idSetIdle.add(i);
    }
  }

  public getAndUseIdleId(): number {
    if (this.idSetIdle.size <= 0) {
      return -1;
    }
    const idleId = this.idSetIdle.keys().next();
    this.idSetUsed.add(idleId.value);
    this.idSetIdle.delete(idleId.value);
    return idleId.value;
  }

  public freeId(id: number) {
    this.idSetIdle.add(id);
    this.idSetUsed.delete(id);
  }
}