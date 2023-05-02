import { UpdateEnrollmentParams } from "@/repositories";
import Joi from "joi";
import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";

const mobilePhoneValidationSchema = Joi.string().min(13).max(15).custom(joiMobilePhoneValidation);

export const updateEnrollmentSchema = Joi.object<UpdateEnrollmentParams>({
  name: Joi.string().min(3).max(30).required(),
  birthday: Joi.string().isoDate().required(),
  phone: mobilePhoneValidationSchema.required(),
  profilePicture: Joi.string().required()
});

function joiMobilePhoneValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidMobilePhone(value)) {
    return helpers.error("any.invalid");
  }

  return value;
}
