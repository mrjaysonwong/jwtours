import User from '@model/userModel';

export async function handleProviderSignIn(user, account) {
  // check for existing user
  const userExists = await User.findOne({ email: user.email });
  const [firstName, lastName] = user.name.split(' ');

  const newUser = {
    id: user.id,
    firstName,
    lastName: lastName ?? '',
    email: user.email,
    password: '',
    image: user.image,
    accountType: account.provider,
    isVerified: true,
  };

  if (!userExists) {
    await User.create({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      image: {
        url: newUser.image,
      },
      accountType: newUser.accountType,
      isVerified: newUser.isVerified,
    });
  }

  if (userExists) {
    // if existing user and with provider
    await User.findOneAndUpdate(
      {
        email: user.email,
      },
      {
        id: user.id,
        email: user.email,
        image: {
          public_id: userExists.image.public_id,
          url: user.image,
        },
        accountType: account.provider,
      },
      { new: true }
    );
  }
}
