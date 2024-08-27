import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDataBase } from "../init";
import { LogModel } from "./log.model";

describe("Test in log.model.ts", () => {
  /* lo más facil y senciillo y lo que bastaría hacer sería conectarse a la base de datos y crear el registro acorde a lo que estamos esperando */
  beforeAll(async () => {
    /* para conectarnos a MongoDB */
    await MongoDataBase.connect({
      databaseName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterAll(() => {
    /* para cerrar la conexión a mongoose */
    mongoose.connection.close();
  });

  test("should return LogModel", async () => {
    const logData = {
      origin: "log.model.test.ts",
      message: "test-message",
      severityLevel: "low",
    };

    /* nuestro objeto para la base de datos (la inseción a la base de datos) */
    const newLog = await LogModel.create(logData);

    // console.log(newLog);
    /* lo que nos da el newLog sería esto:
      {
        severityLevel: 'low',
        message: 'test-message',
        origin: 'log.model.test.ts',
        createdAt: 2024-08-27T20:58:58.810Z,
        _id: new ObjectId('66ce3e121ca6a4b02ab9f35c'),
        __v: 0
      }

      tener presente que Mongoose hace una conversión automática entre _id y id cuando se trabaja con documentos. En MongoDB, el campo _id es un campo especial que se utiliza como identificador único para cada documento. Sin embargo, cuando se utiliza Mongoose, el campo _id se convierte automáticamente en id en el objeto JavaScript que se devuelve, por eso se utiliza id en lugar de _id en el test
    */

    /* para que el newLog sea igual a un objeto que contiene lo que viene del logData más las otras propiedades */
    expect(newLog).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
      })
    );

    /* como usamos una base de datos, la cual es de prueba para el test, igual sería bueno que al crear el registro arriba (porque sí se guarda en la base de datos de test) sería bueno también eliminarlo */
    await LogModel.findByIdAndDelete(newLog.id);
  });

  test("should return the schema object", () => {
    const schema = LogModel.schema.obj;

    console.log(schema);
    /* lo que nos da el schema sería esto:
      {
        severityLevel: {
          type: [Function: String],
          enum: [ 'low', 'medium', 'high' ],
          default: 'low'
        },
        message: { type: [Function: String], require: true },
        origin: { type: [Function: String] },
        createdAt: { type: [Function: Date], default: 2024-08-27T22:02:58.090Z }
      }
    */

    expect(schema).toEqual(
      expect.objectContaining({
        severityLevel: {
          type: expect.any(Function),
          enum: ["low", "medium", "high"],
          default: "low",
        },
        message: { type: expect.any(Function), require: true },
        origin: { type: expect.any(Function) },
        createdAt: expect.any(Object),
      })
    );
  });
});
