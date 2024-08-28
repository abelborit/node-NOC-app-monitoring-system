import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe("Test in check-service.ts", () => {
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  /* aquí no se quiere probar que se guarde el log porque no es la tarea de este caso de uso del CheckService, y basta y sobra con que se mande a llamar el método y lo que pase en su interior no nos importa ahora porque no estamos haciendo test de integración en este test unitario */
  const checkService = new CheckService(
    successCallback,
    errorCallback,
    mockRepository
  );

  /* cuando se tengan mock function y se haga más de un test, entonces sería bueno limpiar esos mocks */
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch returns true", async () => {
    const wasOk = await checkService.execute("https://google.com");

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    /* aquí se puede colocar con lo que se muestre colocando expect( mockRepository.saveLog ).toHaveBeenCalledWith({}); para que salga un log, pero sino que espere cualquier cosa del LogEntity */
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call errorCallback when fetch returns false", async () => {
    const wasOk = await checkService.execute(
      "https://goasdfasdfasdfasdogle.com"
    );

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
