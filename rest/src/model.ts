import { Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository, getManager } from 'typeorm';

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

export async function getDatabaseOutline() {
  await tryConnect();
  return getManager().query(
  'select "schema", type, name from'
  + '\n' + '('
  + '\n' + 'select schema_name(t.schema_id) as "schema", '+"'"+'<table>'+"'"+' as type, t.name as name from sys.tables as t'
  + '\n' + 'UNION'
  + '\n' + 'select schema_name(v.schema_id) as "schema", '+"'"+'<view>'+"'"+' as type, v.name as name from sys.views as v'
  + '\n' + ') as u'
  + '\n' + 'order by "schema", type, name'
  + '\n' + ';'
  );
}

