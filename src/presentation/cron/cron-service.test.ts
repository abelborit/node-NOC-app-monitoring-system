import { CronService } from "./cron-service";

describe("Test in cron-service.ts", () => {
  const mockTick = jest.fn();

  /* como solo se tiene un test entonces no sería necesario limpiar los mocks porque solo hay un test */
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* se usa el método done porque como hay un setTimeout, entonces le estamos diciendo a jest que se espere a que se llame el método done para terminar el test */
  test("should create a job", (done) => {
    const job = CronService.createJob("* * * * * *", mockTick);

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2); // se coloca 2 porque según la configuración de arriba está para que se llame cada 1 segundo porque abajo se está deteniendo con el job.stop(). Si se coloca más de 2 entonces habría un error
      job.stop();
      done();
    }, 2000);
  });
});
