import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DevolutionRentalUseCase from '@modules/rentals/useCases/devolutionRental/devolutionRentalUseCase';

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: userId } = request.user;
        const { id: rentalId } = request.params;

        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

        const rental = await devolutionRentalUseCase.execute({
            userId,
            rentalId,
        })

        return response.status(201).json(rental);
    }
}

export default DevolutionRentalController;
