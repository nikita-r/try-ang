import { Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository } from 'typeorm';

let cnxn: Connection;
async function tryConnect() {
  if (cnxn===undefined) {
    cnxn = await createConnection({
      type: 'mssql',
      host: 'localhost',
      port: 65496,

      username: 'usr',
      password: 'pwd',

      options: {
        //useUTC: true,
        enableArithAbort: true
      },

      database: 'AdventureWorks',

      entities: [
        Person_EmailAddress
      ]
    });
  }
}

@Entity({ schema: 'Person', name: 'EmailAddress' })
export class Person_EmailAddress {

  @Column()
  BusinessEntityID: number;
  @PrimaryGeneratedColumn()
  EmailAddressID: number;

  @Column()
  EmailAddress: string;

  @Column()
  ModifiedDate: Date;
}

export async function getProductRepository(): Promise<Repository<Person_EmailAddress>> {
  await tryConnect();
  return cnxn.getRepository(Person_EmailAddress);
}
