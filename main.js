import { retreiveFacebookReviews } from './src/retreiveFacebookReviews';
import { retreiveYelpHiddenReviews } from './src/retreiveYelpHiddenReviews';
import { retreiveYelpShownReviews } from './src/retreiveYelpShownReviews';
import {argv} from 'yargs';
import dotenv from 'dotenv';
import { isMainThread } from 'worker_threads';
const facebookHeaders = dotenv.config({ path: './facebook-headers.env' });
const yelpHeaders = dotenv.config({ path: './yelp-headers.env' });
const main = async () => {
  retreiveFacebookReviews(facebookHeaders);
  retreiveYelpShownReviews(yelpHeaders);
  retreiveYelpHiddenReviews(yelpHeaders);
};

main();
