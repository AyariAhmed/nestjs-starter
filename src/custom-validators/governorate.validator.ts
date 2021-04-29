import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import GovMunicip from "../auth/entities/SupportedCities";

@ValidatorConstraint({ name: 'customText', async: false })
export class ValidGovernorate implements ValidatorConstraintInterface {
  validate(governorate: string, args: ValidationArguments) {
    return Object.keys(GovMunicip).includes(governorate);
  }


  }
