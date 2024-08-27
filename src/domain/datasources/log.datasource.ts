/* datasources va a contener los orígenes de datos, por ejemplo, una base de datos, es de dónde vamos a tomar los datos. No crearemos la implementación del datasource, sino que crearemos las clases abstractas, que serían como unas interfaces que nos permitan poner las reglas de cómo queremos que funcione */

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

/* la palabra reservada "abstract" es para asegurarnos de que no se creen instancias de la clase, ya que no se pueden crear instancias de una clase abstracta por ejemplo "const LogInstance = new LogDatasource()" ya que nos daría el error de "Cannot create an instance of an abstract class." Se usará la clase abstracta para poder definir el comportamiento base que quiero que tengan otras clases */
export abstract class LogDatasource {
  /* cualquier origen de datos va a tener que implementar todos los métodos abstractos que coloquemos aquí */

  /* aquí se está colocando el tipo de dato LogEntity lo cual es una clase, pero las clases también pueden servir para definir un tipo de dato así como funcionaría una interface. Aquí no tiene mucho sentido que para hacer un saveLog se tenga que mandar la entidad de LogEntity para grabarlo porque en el datasource es en donde se asigna el id para establecerlo ahí, entonces aquí deberíamos usar en realidad los DTOs que no lo creamos en este proyecto pero sí en el de "node-REST-Web" */
  abstract saveLog(newLog: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
