export class Kpi {
  constructor(
    public label: string,
    public value: number,
    public deltaPct: number,           // +12, -5
    public icon: string                // material icon name
  ) {}
}
