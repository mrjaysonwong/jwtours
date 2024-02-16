import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { namePrefix } = req.query;

    if (!namePrefix) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND
          message: 'Resource Not Found. Please provide a valid namePrefix.',
        },
      });
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
    console.error(error.message);

    return res.status(500).json({
      error: {
        code: 500,
        message: 'An error occurred. Please try again.',
      },
    });
  }
}
