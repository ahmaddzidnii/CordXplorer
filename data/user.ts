export const getUserById = async (id: string) => {
  try {
    return prisma?.user.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
