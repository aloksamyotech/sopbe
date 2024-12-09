import CustomError from "../middlewares/exception";

export const getUser = (req, res, next) => {
    const userId = req.params.id;
    const user = userId === '1' ? { id: 1, name: 'John Doe' } : null;

    if (!user) {
        return next(new CustomError({
            statusCode: 404,
            message: 'User not found',
            errorCode: 'USER_NOT_FOUND',
        }));
    }

    res.status(200).send(user); 
};