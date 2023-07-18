import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NullProvider, HashiCupsProvider } from '@cdktf/provider-null';
import { TerraformOutput, TerraformStack, Token } from 'cdktf';

export class CoffeeOrderingStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const orderItemsPath = './order_items';

    // HashiCups provider
    const hashicupsProvider = new HashiCupsProvider(this, 'hashicups', {
      alias: 'hashicups',
    });

    // Null provider
    const nullProvider = new NullProvider(this, 'null', {
      alias: 'null',
    });

    // Orders
    const orderFiles = this.listFiles(orderItemsPath);
    orderFiles.forEach((file) => {
      const orderId = file.replace('.txt', '');
      const orderFilePath = `${orderItemsPath}/${file}`;

      // Read the file contents
      const orderContents = this.readOrderContents(orderFilePath);

      // Create a HashiCups order
      new HashiCupsProvider.Order(this, `order-${orderId}`, {
        alias: `hashicups_order_${orderId}`,
        coffee: orderContents.coffee,
        quantity: orderContents.quantity,
      });
    });

    // Outputs
    new TerraformOutput(this, 'hashicupsProviderAlias', {
      value: Token.asString(hashicupsProvider.getAlias('hashicups')),
    });
    new TerraformOutput(this, 'nullProviderAlias', {
      value: Token.asString(nullProvider.getAlias('null')),
    });
  }

  private listFiles(dir: string): string[] {
    const fs = require('fs');
    return fs.readdirSync(dir);
  }

  private readOrderContents(filePath: string): { coffee: string; quantity: number } {
    const fs = require('fs');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const [coffee, quantity] = fileContents.split(',');
    return { coffee, quantity: parseInt(quantity) };
  }
}

const app = new cdk.App();
new CoffeeOrderingStack(app, 'CoffeeOrderingStack');
app.synth();
