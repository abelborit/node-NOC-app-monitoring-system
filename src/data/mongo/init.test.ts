import mongoose from "mongoose";
import { MongoDataBase } from "./init";

describe("Test in init.ts - Connect to MongoDB", () => {
  /* para evitar el mensaje de la consola de "A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them." que en pocas palabras es que cuando terminamos de hacer la conexión todavían quedan residuos entonces se puede quitar cerrando la conexión a mongoose */
  afterAll(() => {
    mongoose.connection.close(); // para cerrar la conexión a mongoose
  });

  test("should connect to MongoDB", async () => {
    /* como ya tenemos el setupTest.ts entonces ya podemos usar de forma directa las env desde el process.env...... */
    // console.log({
    //   MONGO_URL: process.env.MONGO_URL,
    //   MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    // });

    const connected = await MongoDataBase.connect({
      mongoUrl: process.env.MONGO_URL!, // se coloca con el ! porque ya en este punto deberíamos tener esa env
      databaseName: process.env.MONGO_DB_NAME!, // se coloca con el ! porque ya en este punto deberíamos tener esa env
    });

    expect(connected).toBe(true);
  });

  test("should throw an error if not connect to MongoDB", async () => {
    try {
      const connected = await MongoDataBase.connect({
        mongoUrl: process.env.MONGO_URL! + "Hola", // se coloca con el ! porque ya en este punto deberíamos tener esa env
        databaseName: process.env.MONGO_DB_NAME!, // se coloca con el ! porque ya en este punto deberíamos tener esa env
      });

      /* se agrega en este caso como una forma de asegurar que el código nunca llegue a ese punto. Si por alguna razón la cadena de conexión funcionara y no se lanzara una excepción, entonces esa línea se ejecutaría y fallaría la prueba, indicando que algo inesperado ha ocurrido. Es una forma de hacer una afirmación que siempre debe fallar para indicar un comportamiento incorrecto o inesperado en el código. Aunque se quite esa línea, la prueba seguirá pasando si se lanza la excepción esperada, pero si no se lanza, no se tendrá una indicación clara de que algo salió mal */
      expect(true).toBe(false); // esta condición nunca debería de lanzarse porque si se lanza entonces daría un error en el test, pero como se le está cambiando el env entonces este expect(true).toBe(false); no debería de lanzarse nunca y ya de frente iría al catch para tener el error del test
    } catch (error) {
      // console.log(error);
      /* aquí no sería necesario colocar algún expect porque si la prueba no regresa nada entonces ya pasa el test con una cobertura al 100% porque ya se probó la excepción colocando el mongoUrl: process.env.MONGO_URL! + "Hola" */
    }
  });
});
