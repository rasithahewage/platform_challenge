import { Construct } from 'constructs';
import { TerraformStack } from 'cdktf';
import { HashicupsProvider, Order } from '@cdktf/provider-hashicups';
import * as path from 'path';
import * as fs from 'fs';

interface OrderItem {
  coffee: string;
  quantity: number;
}

export class CoffeeOrderingStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const ordersPath = './orders';

    // HashiCups provider
    const hashicupsProvider = new HashicupsProvider(this, 'hashicups', {
      alias: 'hashicups',
    });

    // Process order folders
    const orderFolders = this.listOrderFolders(ordersPath);
    orderFolders.forEach((folderName) => {
      const orderId = path.basename(folderName);

      // Read order items from files
      const orderItems = this.readOrderItems(path.join(ordersPath, folderName));

      // Create a HashiCups order for each item
      orderItems.forEach((item) => {
        new Order(this, `order-${orderId}-${item.coffee}`, {
          alias: `order_${orderId}_${item.coffee}`,
          coffee: item.coffee,
          quantity: item.quantity,
        });
      });
    });

    // Output provider alias
    this.outputValue('hashicupsProviderAlias', hashicupsProvider.getAlias('hashicups'));
  }

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
  }
}
