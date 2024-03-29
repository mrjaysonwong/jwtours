import axios from 'axios';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

export default async function handler(req, res) {
  try {
    const { namePrefix } = req.query;

    if (!namePrefix) {
      return handleResponseError(
        res,
        404,
        'An error occurred. Please try again later.',
        'Invalid or missing parameters.'
      );
    }

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/places`;

    // no need mode: 'cors' in API Routes/Nextjs
    // same-origin only by default
    const options = {
      method: 'GET',
      params: {
        namePrefix: namePrefix,
        limit: 10,
        sort: '-population',
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST,
      },
    };

    const { data } = await axios.get(url, options);

    const result = data.data;

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return handleResponseError(
      res,
      500,
      'Internal Server Error. Please try again later.',
      error.message
    );
  }
}
