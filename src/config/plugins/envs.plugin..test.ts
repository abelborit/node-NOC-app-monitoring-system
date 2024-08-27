import { envs } from "./envs.plugin";

describe("Test in envs.plugin.ts", () => {
  test("should return env options", () => {
    // console.log(envs);
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "correo_prueba@gmail.com",
      MAILER_SECRET_KEY: "123ZXC",
      PROD: false,
      MONGO_URL: "mongodb://fernando:123456@localhost:27017",
      MONGO_DB_NAME: "NOC_APP_TEST",
      MONGO_USER: "fernando",
      MONGO_PASS: "123456",
      POSTGRES_URL: "postgresql://fernando:123456@localhost:5432/NOC_APP_TEST",
      POSTGRES_DB_NAME: "NOC_APP_TEST",
      POSTGRES_USER: "fernando",
      POSTGRES_PASS: "123456",
    });
  });

  test("should return error if not found env option", async () => {
    // console.log(envs);
    jest.resetModules(); // para estar seguros que se resetó el módulo por decirlo así para que podamos establecer los nuevo env y asegurarnos de que sobreescribirá los nuevos env
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugin"); // para volver a cargar el archivo porque sino ya toma la configuración del test anterior

      expect(true).toBe(false); // esta condición nunca debería de lanzarse porque si se lanza entonces daría un error en el test, pero como se le está cambiando el env del PORT arriba entonces este expect(true).toBe(false); no debería de lanzarse nunca y ya de frente iría al catch para tener el error del test por el cambio de env del PORT
    } catch (error) {
      // console.log(error);

      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
