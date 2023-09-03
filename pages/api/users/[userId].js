// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../auth/[...nextauth]';

// // GET: domain/api/users/:userId
// export default async function getUser(req, res) {
//   const session = await getServerSession(req, res, authOptions);

//   if (session) {
//     return res.send({
//       content:
//         'This is protected content, You can access this content because you are signed in.',
//     });
//   }

//   res.send({
//     error: 'You must be signed in to view this content',
//   });
// }
