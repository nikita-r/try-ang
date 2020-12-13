import * as express from 'express';
import * as cors from 'cors';
//import * as bodyParser from 'body-parser';
import { router as productRouter } from './product';

const port = 4201;

// iwr http://localhost:$port/product -Method Post -Body '{ "EmailAddress": "user@org.inc" }' -Headers @{ 'Content-Type'='application/json' }
// iwr http://localhost:$port/product/0 -Method Delete

const app = express()
            .use(cors())
            .use(express.json())
            .use(productRouter)
            ;

app.listen(port, (err) => {
  if (err) { return console.log(err); }
  return console.log('rest/server listening on port', port);
});

