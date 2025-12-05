import { Request, Response } from 'express';
import CardModel from '../models/card';
import { ERROR_MESSAGES, STATUS_CODES } from '../consts';

export const getCards = async (req: Request, res: Response) => {
    try {
        const cards = await CardModel.find({});

        return res.status(STATUS_CODES.OK).json(cards);
    } catch (err) {
        return res
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const createCard = async (req: Request, res: Response) => {
    try {
        const { name, link } = req.body;
        // @ts-ignore
        const owner = req.user!._id;

        const card = await CardModel.create({ name, link, owner });

        return res.status(STATUS_CODES.CREATED).json(card);
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json({ message: ERROR_MESSAGES.BAD_REQUEST });
        }
        return res
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const deleteCard = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;

        await CardModel.findByIdAndDelete(cardId).orFail();

        return res.status(STATUS_CODES.OK).json({ message: 'Карточка удалена' });
    } catch (err: any) {
        if (err.name === 'DocumentNotFoundError') {
            return res
                .status(STATUS_CODES.NOT_FOUND)
                .json({ message: ERROR_MESSAGES.NOT_FOUND });
        }
        if (err.name === 'CastError') {
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json({ message: ERROR_MESSAGES.BAD_REQUEST });
        }
        return res
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const likeCard = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        // @ts-ignore
        const userId = req.user!._id;

        const card = await CardModel.findByIdAndUpdate(
            cardId,
            { $addToSet: { likes: userId } },
            { new: true, runValidators: true },
        ).orFail();

        return res.status(STATUS_CODES.OK).json(card);
    } catch (err: any) {
        if (err.name === 'DocumentNotFoundError') {
            return res
                .status(STATUS_CODES.NOT_FOUND)
                .json({ message: ERROR_MESSAGES.NOT_FOUND });
        }
        if (err.name === 'CastError') {
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json({ message: ERROR_MESSAGES.BAD_REQUEST });
        }
        return res
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const dislikeCard = async (req: Request, res: Response) => {
    try {
        const { cardId } = req.params;
        // @ts-ignore
        const userId = req.user!._id;

        const card = await CardModel.findByIdAndUpdate(
            cardId,
            { $pull: { likes: userId } },
            { new: true, runValidators: true },
        ).orFail();

        return res.status(STATUS_CODES.OK).json(card);
    } catch (err: any) {
        if (err.name === 'DocumentNotFoundError') {
            return res
                .status(STATUS_CODES.NOT_FOUND)
                .json({ message: ERROR_MESSAGES.NOT_FOUND });
        }
        if (err.name === 'CastError') {
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json({ message: ERROR_MESSAGES.BAD_REQUEST });
        }
        return res
            .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};
