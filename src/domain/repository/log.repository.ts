/* el repository es cómo vamos a mandar a llamar nuestro datasource ya que no llegamos al datasource directamente sino mediante un repositorio. No crearemos la implementación del repository, sino que crearemos las clases abstractas, que serían como unas interfaces que nos permitan poner las reglas de cómo queremos que funcione */

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

/* la palabra reservada "abstract" es para asegurarnos de que no se creen instancias de la clase, ya que no se pueden crear instancias de una clase abstracta por ejemplo "const LogInstance = new LogRepository()" ya que nos daría el error de "Cannot create an instance of an abstract class." Se usará la clase abstracta para poder definir el comportamiento base que quiero que tengan otras clases */

/* este LogRepository servirá para hacer de puente al LogDatasource ya que si en algún momento se llega a cambiar el datasource entonces no se tendrá que cambiar los casos de uso u otros cambios adicionales debido al cambio del datasource. Los métodos abstractos que tenga este LogRepository serán los mismos a los que tenga el LogDatasource porque al final de cuentas el LogRepository se conectará al LogDatasource */
export abstract class LogRepository {
  /* aquí se está colocando el tipo de dato LogEntity lo cual es una clase, pero las clases también pueden servir para definir un tipo de dato así como funcionaría una interface */
  abstract saveLog(newLog: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
