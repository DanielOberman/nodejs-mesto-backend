import { Request, Response } from 'express';
import UserModel from '../models/user';
import { ERROR_MESSAGES, STATUS_CODES } from '../consts';

export const getUsers = (req: Request, res: Response) => {
    UserModel.find({})
        .then((users) => res.send(users))
        .catch(() => res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR }));
};

export const getUserById = (req: Request, res: Response) => {
    UserModel.findById(req.params.userId)
        .orFail()
        .then((user) => res.send(user))
        .catch((err) => {
            if (err.name === 'CastError') {
                return res.status(STATUS_CODES.BAD_REQUEST).send({ message: ERROR_MESSAGES.BAD_REQUEST });
            }
            if (err.name === 'DocumentNotFoundError') {
                return res.status(STATUS_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.NOT_FOUND });
            }
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
                .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        });
};

export const createUser = (req: Request, res: Response) => {
    const { name, about, avatar } = req.body;

    UserModel.create({ name, about, avatar })
        .then((user) => res.status(STATUS_CODES.CREATED).send(user))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(STATUS_CODES.BAD_REQUEST).send({ message: ERROR_MESSAGES.BAD_REQUEST });
            }
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
                .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        });
};

export const updateUser = (req: Request, res: Response) => {
    const { name, about } = req.body;
    // @ts-ignore
    const userId = req.user!._id;

    UserModel.findByIdAndUpdate(
        userId,
        { name, about },
        { new: true, runValidators: true },
    )
        .orFail()
        .then((user) => res.send(user))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(STATUS_CODES.BAD_REQUEST).send({ message: ERROR_MESSAGES.BAD_REQUEST });
            }
            if (err.name === 'DocumentNotFoundError') {
                return res.status(STATUS_CODES.NOT_FOUND).send({ message: ERROR_MESSAGES.NOT_FOUND });
            }
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
                .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        });
};

export const updateAvatar = (req: Request, res: Response) => {
    const { avatar } = req.body;
    // @ts-ignore
    const userId = req.user!._id;

    UserModel.findByIdAndUpdate(
        userId,
        { avatar },
        { new: true, runValidators: true },
    )
        .orFail()
        .then((user) => res.send(user))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return res.status(STATUS_CODES.BAD_REQUEST)
                    .send({ message: ERROR_MESSAGES.BAD_REQUEST });
            }
            if (err.name === 'DocumentNotFoundError') {
                return res.status(STATUS_CODES.NOT_FOUND)
                    .send({ message: ERROR_MESSAGES.NOT_FOUND });
            }
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
                .send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        });
};
