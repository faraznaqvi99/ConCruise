import { Injectable } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { CustomersService } from 'src/customer/customer.service';
import { CruisersService } from '../cruiser/cruiser.service';
import { calculateDistance } from 'src/utils';

@Injectable()
export class MyService {
  constructor(
    private readonly consoleService: ConsoleService,
    private CustomersService: CustomersService,
    private CruisersService: CruisersService,
  ) {
    const cli = this.consoleService.getCli();

    this.consoleService.createCommand(
      {
        command: 'customer',
        description: 'Get all customers',
      },
      this.getCustomers,
      cli,
    );

    this.consoleService.createCommand(
      {
        command: 'cruiser',
        description: 'Get all cruisers',
      },
      this.getCruisers,
      cli,
    );

    this.consoleService.createCommand(
      {
        command: 'match',
        description: 'Match customers and cruisers',
      },
      this.match,
      cli,
    );

    this.consoleService.createCommand(
      {
        command: 'manual',
        description: 'Show all commands',
      },
      this.manual,
      cli,
    );
  }

  manual = () => {
    console.log(
      '\nHello! This is the Command Line Interface for ConCruise. Following is the list of available commands you can run.',
    );
    console.log('\ncustomer - Show existing list of customers \n');
    console.log('cruiser - Show existing list of cruisers \n');
    console.log('match \n');
    console.log('\t - Show each customer and assigned driver');
    console.log('\t - List of failed fulfilment customers if any exists.');
    console.log('\t - List of idle drivers if any exist. \n');
    console.log('manual - Show this help. \n');
  };

  getCustomers = async () => {
    const customers = await this.CustomersService.findAll();
    console.log({ customers });
  };

  getCruisers = async () => {
    const cruisers = await this.CruisersService.findAll();
    console.log({ cruisers });
  };

  match = async () => {
    let customers = await this.CustomersService.findAll();
    let cruisers = await this.CruisersService.findAll();

    let assigned = [];
    let mappings = [];
    customers.map((customer) => {
      let weights = {};
      cruisers.map((cruiser) => {
        let points: number = 0;
        //find distance in a straight line in KMs
        let distance = calculateDistance(
          customer.locationLatitude,
          customer.locationLongitude,
          cruiser.locationLatitude,
          cruiser.locationLongitude,
        );
        if (distance <= 3.0) points += 7;
        else if (distance <= 5.0) points += 3;

        if (customer.rating >= cruiser.rating) points += 2;

        if (customer.numberOfRides <= 2 && cruiser.numberOfRides >= 3)
          points += 5;
        else if (customer.numberOfRides > 2 && cruiser.numberOfRides < 3)
          points += 2;

        if (points > 0)
          mappings.push({
            customer: customer.name,
            cruiser: cruiser.name,
            points: points,
          });
      });
    });
    mappings = mappings.sort((a, b) => b.points - a.points);
    this.assignCruiserToCustomer(mappings, assigned);

    let failedFulfillments = customers
      .filter(
        (customer) =>
          !assigned.find((record) => record.customer === customer.name),
      )
      .map((customer) => ({ name: customer.name }));
    let idleCruisers = cruisers
      .filter(
        (cruiser) =>
          !assigned.find((record) => record.cruiser === cruiser.name),
      )
      .map((cruiser) => ({ name: cruiser.name }));

    console.log('ASSIGNED\n');
    console.table(assigned);
    console.log('\nFAILED FULFILLMENTS\n');
    console.table(failedFulfillments);
    console.log('\nIDLE CRUISERS\n');
    console.table(idleCruisers);
  };

  assignCruiserToCustomer = (mappings, assigned) => {
    //recursively assign cruisers to customers and filtering records of the assigned cruisers/customers
    if (mappings.length < 1) return;
    let currentMapping = mappings[0];
    assigned.push(mappings[0]);
    mappings = mappings.filter(
      (mapping) =>
        !(
          mapping.customer === currentMapping.customer ||
          mapping.cruiser === currentMapping.cruiser
        ),
    );
    this.assignCruiserToCustomer(mappings, assigned);
  };
}
