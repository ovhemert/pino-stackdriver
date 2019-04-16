/// <reference types="node" />
declare namespace PinoStackdriver {
  export interface Options {
    /**
     * Full path to the JSON file containing the Google Service Credentials.
     * Defaults to GOOGLE_APPLICATION_CREDENTIALS environment variable.
     */
    credentials?: string;

    /**
     * The name of the project.
     */
    projectId: string;

    /**
     * The name of the log.
     * @default "pino_log"
     */
    logName?: string;

    /**
     * The MonitoringResource to send logs to.
     * @default { type: "global" }
     */
    resource?: {
      type: string;
      labels?: Record<string, string>;
    }
  }

  /**
   * Create a writestream that `pino-multi-stream` can use to send logs to.
   * @param options
   */
  export const createWriteStream: (options: Options) => NodeJS.WritableStream;
}

export = PinoStackdriver
