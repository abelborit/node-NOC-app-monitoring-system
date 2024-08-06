/* hay que crear esquemas y modelos y estos son una forma de colección que sería como una tabla en una base de datos relacionales. Es una manera en la cual vamos a comenzar a grabar información en nuestra base de datos mongodb. Aquí se llaman modelos porque de alguna manera tenemos que ir viendo cómo vamos a guardar nuestra información en mongo */

/* uno de los beneficios de trabajar con mongoose y mongo es que a diferencia de la base de datos relacionales, aquí se puede ir trabajando con la base de datos antes de se tenga definida la base de datos que aquí son llamadas colecciones y documentos */

/* como sabemos, nuestra entidad "src\domain\entities\log.entity.ts" es la que rije, entonces nosotros tenemos que hacernos un modelo para trabajar con la información similar a la que está abajo, puede ser idéntica, puede ser diferente, puede que tenga una base de datos ya esté previamente creada, etc, pero lo de abajo es lo que se maneja en la entidad y eso es lo importante para nosotros y no lo que esté en la base de datos, lo cual puede ser algo dificil de pensar porque se puede decir que la base de datos es quien rije todo, cosa que al día de mañana puede cambiar la base de datos o la estructura o algo similar y la aplicación no debería verse afectada */
/*
  severityLevel: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
*/

import mongoose from "mongoose";

/* el esquema serán las reglas que queremos definir en el objeto */
const logSchema = new mongoose.Schema({
  severityLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  message: {
    type: String,
    require: true, // si se quiere guardar en nuestro logSchema entonces el message tiene que venir sí o sí porque si no dará un error
  },
  origin: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(), // para que no lo tengan que proporcionar sino que automáticamente lo cree
  },
});

/* modelo para poder interactuar con mongo */
export const LogModel = mongoose.model("Log", logSchema);
