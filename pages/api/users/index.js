import connectMongo from 'lib/database/connection';
import { getToken } from 'next-auth/jwt';
import { getAllUsers } from '../handlers/usersAPI/admin-authorized/Read/getAllUsers';
import { getUser } from '../handlers/usersAPI/admin-authorized/Read/getUser';
import { updatePersonalDetails } from '../handlers/usersAPI/Update/updatePersonalDetails';
import { updateProfilePhoto } from '../handlers/usersAPI/Update/updateProfilePhoto';
import { deleteProfilePhoto } from '../handlers/usersAPI/Update/deleteProfilePhoto';
import { updatePrimaryEmail } from '../handlers/usersAPI/Update/updatePrimaryEmail';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await connectMongo();

    const token = await getToken({ req });

    if (!token) {
      return handleResponseError(
        res,
        400,
        'An error occured. Please try again later.',
        'Invalid or missing token'
      );
    }

    switch (method) {
      case 'GET':
        if (query.userId) {
          await getUser(req, res, token);
        } else {
          await getAllUsers(req, res, token);
        }

        break;
      case 'PATCH':
        if (!query.userId || !query.mode) {
          return handleResponseError(
            res,
            400,
            'An error occured. Please try again later.',
            'Invalid or missing parameters.'
          );
        }

        if (query.mode === 'update-profilephoto') {
          await updateProfilePhoto(req, res);
        } else if (query.mode === 'delete-profilephoto') {
          await deleteProfilePhoto(req, res);
        } else if (query.mode === 'update-personaldetails') {
          await updatePersonalDetails(req, res);
        } else if (query.mode === 'update-primaryemail') {
          await updatePrimaryEmail(req, res);
        }

        break;

      default:
        res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
    }
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
