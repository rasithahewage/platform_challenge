import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
<<<<<<< HEAD
import { HashiCupsProvider, NullProvider } from '@cdktf/provider-null';
import { TerraformOutput, TerraformStack, Token } from 'cdktf';
import * as path from 'path';
import * as fs from 'fs';

interface OrderItem {
  coffee: string;
  quantity: number;
}

=======
import { NullProvider, HashiCupsProvider } from '@cdktf/provider-null';
import { TerraformOutput, TerraformStack, Token } from 'cdktf';

>>>>>>> 632105fc92f7f61c1cad7cee0125aaa0d10e4e7a
export class CoffeeOrderingStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

<<<<<<< HEAD
    const ordersPath = './orders';
=======
    const orderItemsPath = './order_items';
>>>>>>> 632105fc92f7f61c1cad7cee0125aaa0d10e4e7a

    // HashiCups provider
    const hashicupsProvider = new HashiCupsProvider(this, 'hashicups', {
      alias: 'hashicups',
    });

    // Null provider
    const nullProvider = new NullProvider(this, 'null', {
      alias: 'null',
    });

<<<<<<< HEAD
    // Process order folders
    const orderFolders = this.listOrderFolders(ordersPath);
    orderFolders.forEach((folderName) => {
      const orderId = path.basename(folderName);

      // Read order items from files
      const orderItems = this.readOrderItems(path.join(ordersPath, folderName));

      // Create a HashiCups order for each item
      orderItems.forEach((item, index) => {
        new HashiCupsProvider.Order(this, `order-${orderId}-${index}`, {
          alias: `hashicups_order_${orderId}_${index}`,
          coffee: item.coffee,
          quantity: item.quantity,
        });
=======
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
>>>>>>> 632105fc92f7f61c1cad7cee0125aaa0d10e4e7a
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

<<<<<<< HEAD
  private listOrderFolders(ordersPath: string): string[] {
    return fs.readdirSync(ordersPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  }

  private readOrderItems(orderPath: string): OrderItem[] {
    const orderItems: OrderItem[] = [];

    const files = fs.readdirSync(orderPath, { withFileTypes: true });
    files.forEach((dirent) => {
      if (dirent.isFile()) {
        const itemName = path.basename(dirent.name, path.extname(dirent.name));
        const itemQuantity = Number(fs.readFileSync(path.join(orderPath, dirent.name), 'utf-8').trim());

        orderItems.push({
          coffee: itemName,
          quantity: itemQuantity,
        });
      }
    });

    return orderItems;
=======
  private listFiles(dir: string): string[] {
    const fs = require('fs');
    return fs.readdirSync(dir);
  }

  private readOrderContents(filePath: string): { coffee: string; quantity: number } {
    const fs = require('fs');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const [coffee, quantity] = fileContents.split(',');
    return { coffee, quantity: parseInt(quantity) };
>>>>>>> 632105fc92f7f61c1cad7cee0125aaa0d10e4e7a
  }
}

const app = new cdk.App();
new CoffeeOrderingStack(app, 'CoffeeOrderingStack');
app.synth();
