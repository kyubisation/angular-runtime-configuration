
import { expect } from 'chai';
import { join } from 'path';

import { indexHtmlContent, temporaryFile } from '../../test/temporary-fs';
import { InsertCommand } from './insert-command';
import { EnvironmentVariablesConfiguration } from '../environment-variables-configuration';

describe('cli insert', () => {
  const root = join(__dirname, '..', '..', 'test', 'environment-variables-configuration');

  it('should have no variables, when nothing is provided and search is disabled', async () => {
    const command = new InsertCommand({ dry: true, directory: root });
    const envVariables: EnvironmentVariablesConfiguration = (command as any)._envVariables;
    await command.execute();
    expect(envVariables.variables.length).to.eq(0);
  });

  it('should have environment variables from command line', async () => {
    const env = ['ASDF', 'QWER'];
    const command = new InsertCommand({ dry: true, directory: root, env });
    const envVariables: EnvironmentVariablesConfiguration = (command as any)._envVariables;
    await command.execute();
    expect(envVariables.variables).to.eql(env);
  });

  it('should find environment variables, when searching', async () => {
    const command = new InsertCommand({ dry: true, directory: root, search: true });
    const envVariables: EnvironmentVariablesConfiguration = (command as any)._envVariables;
    await command.execute();
    expect(envVariables.variables).to.eql(['TEST', 'TEST2']);
  });

  it('should be able to configure replacement', async () => {
    const configs = [{ placeholder: 'test' }, { head: true }].map(async config => {
      const command = new InsertCommand(Object.assign({ dry: true, directory: root }, config));
      const envVariables: EnvironmentVariablesConfiguration = (command as any)._envVariables;
      await command.execute();
      expect(envVariables.replacements.length).to.eq(1);
    });
    await Promise.all(configs);
  });

  it('should insert environment variables', async () => {
    const command = new InsertCommand({ directory: root, search: true });
    const envVariables: EnvironmentVariablesConfiguration = (command as any)._envVariables;
    const fileContent = await temporaryFile(
      { file: join(root, 'index.html'), content: indexHtmlContent },
      async () => {
        await command.execute();
      });
    expect(fileContent).to.contain(envVariables.generateIIFE());
  });

  it('should throw, when --placeholder and --head is provided', async () => {
    const command = new InsertCommand({ placeholder: 'test', head: true });
    await expect(command.execute()).to.eventually.rejected;
  });
});