import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadCarImageUseCase from './UploadCarImageUseCase';

interface IFile {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const carImages = request.files as IFile[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const filenames = carImages.map(carImage => carImage.filename);

    await uploadCarImageUseCase.execute({
      carId: id,
      imagesName: filenames,
    });

    return response.status(201).send();
  }
}

export default UploadCarImageController;
