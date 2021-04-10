import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RefreshTokenUseCase from './RefreshTokenUseCase';

class RefreshTokenController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const token = request.body.token || request.headers['X-access-token'] || request.query.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const refreshToken = await refreshTokenUseCase.execute({ token });

        return response.json({
            refresh_token: refreshToken
        });
    }
}

export default RefreshTokenController;
