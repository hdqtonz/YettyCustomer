export class AbstractInitializationFactory {
  static getInitializationFunction(initService: {
    initialize: () => void;
  }): () => Promise<void> {
    return async (): Promise<void> => {
      return initService.initialize();
    };
  }
}
