import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("Test in check-service-multiple.ts", () => {
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const mockRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  /* aquí no se quiere probar que se guarde el log porque no es la tarea de este caso de uso del CheckService, y basta y sobra con que se mande a llamar el método y lo que pase en su interior no nos importa ahora porque no estamos haciendo test de integración en este test unitario */
  const checkService = new CheckServiceMultiple(
    successCallback,
    errorCallback,
    [mockRepository1, mockRepository2, mockRepository3]
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

    /* aquí se puede colocar con lo que se muestre colocando expect( mockRepository1.saveLog ).toHaveBeenCalledWith({}); para que salga un log, pero sino que espere cualquier cosa del LogEntity */
    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call errorCallback when fetch returns false", async () => {
    const wasOk = await checkService.execute(
      "https://goasdfasdfasdfasdogle.com"
    );

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();

    expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
