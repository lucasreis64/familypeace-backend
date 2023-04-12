import { CreateEnrollmentParams } from "@/repositories";
import Joi from "joi";
import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";

const mobilePhoneValidationSchema = Joi.string().min(14).max(15).custom(joiMobilePhoneValidation);

export const createEnrollmentSchema = Joi.object<CreateEnrollmentParams>({
  familyId: Joi.number().min(1).strict(),
  userId: Joi.number().min(1).required().strict(),
  birthday: Joi.string().isoDate(),
  phone: mobilePhoneValidationSchema,
  profilePicture: Joi.string()
});

function joiMobilePhoneValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidMobilePhone(value)) {
    return helpers.error("any.invalid");
  }

  return value;
}
