interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCalback = () => void;
type ErrorCalback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  /* la inyección de dependencias se realiza en un constructor y si se está usando JavaScript puro entonces se podría hacer en un Factory Function donde el builder del factory recibe las dependencias y luego ya crea la función que ya viene con las dependencias inyectadas */
  constructor(
    /* se coloca como readonly porque no queremos cambiar accidentalmente successCalback y errorCalback en mi función execute */
    private readonly successCalback: SuccessCalback,
    private readonly errorCalback: ErrorCalback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const request = await fetch(url);

      if (!request.ok) throw new Error(`Error on check service ${url}`);

      this.successCalback();
      // console.log(`${url} is ok!✅`);

      return true;
    } catch (error) {
      // console.log(`${error}❌`);
      this.errorCalback(`${error}`);

      return false;
    }
  }
}
