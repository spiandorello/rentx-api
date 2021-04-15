
interface IUserResponseDTO {
    id: string;
    name: string;
    email: string;
    avatar_url(): string | null;
    driver_license: string;
} 

export default IUserResponseDTO;
