import { setWorldConstructor } from '@cucumber/cucumber';
import { World } from '@cucumber/cucumber';

class CustomWorld extends World {
  constructor(options) {
    super(options);
  }
}

setWorldConstructor(CustomWorld); 